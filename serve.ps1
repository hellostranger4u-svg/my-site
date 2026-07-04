Add-Type @'
using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Collections.Generic;

public class RawServer {
    static Dictionary<string, string> mime = new Dictionary<string, string> {
        {".html", "text/html; charset=utf-8"},
        {".css", "text/css; charset=utf-8"},
        {".js", "application/javascript; charset=utf-8"},
        {".json", "application/json; charset=utf-8"},
        {".svg", "image/svg+xml"},
        {".png", "image/png"},
        {".jpg", "image/jpeg"},
        {".ico", "image/x-icon"}
    };

    public static void Start(string root, int port) {
        var listener = new TcpListener(IPAddress.Loopback, port);
        listener.Start();
        Console.WriteLine("Serving " + root + " on http://localhost:" + port);

        while (true) {
            try {
                var client = listener.AcceptTcpClient();
                var stream = client.GetStream();
                var reader = new StreamReader(stream, Encoding.ASCII);
                var requestLine = reader.ReadLine();
                if (requestLine == null) { client.Close(); continue; }

                // Read remaining headers
                string line;
                while ((line = reader.ReadLine()) != null && line != "") {}

                var parts = requestLine.Split(' ');
                var urlPath = parts.Length > 1 ? parts[1] : "/";
                if (urlPath == "/") urlPath = "/index.html";
                // Remove query string
                int q = urlPath.IndexOf('?');
                if (q >= 0) urlPath = urlPath.Substring(0, q);

                var filePath = Path.Combine(root, urlPath.TrimStart('/').Replace('/', '\\'));

                byte[] body;
                string status;
                string contentType;

                if (File.Exists(filePath)) {
                    body = File.ReadAllBytes(filePath);
                    // Strip UTF-8 BOM
                    if (body.Length >= 3 && body[0] == 0xEF && body[1] == 0xBB && body[2] == 0xBF) {
                        var tmp = new byte[body.Length - 3];
                        Array.Copy(body, 3, tmp, 0, tmp.Length);
                        body = tmp;
                    }
                    status = "200 OK";
                    var ext = Path.GetExtension(filePath).ToLower();
                    contentType = mime.ContainsKey(ext) ? mime[ext] : "application/octet-stream";
                } else {
                    body = Encoding.UTF8.GetBytes("Not Found");
                    status = "404 Not Found";
                    contentType = "text/plain; charset=utf-8";
                }

                var header = "HTTP/1.1 " + status + "\r\n"
                    + "Content-Type: " + contentType + "\r\n"
                    + "Content-Length: " + body.Length + "\r\n"
                    + "Connection: close\r\n"
                    + "Access-Control-Allow-Origin: *\r\n"
                    + "\r\n";

                var headerBytes = Encoding.ASCII.GetBytes(header);
                stream.Write(headerBytes, 0, headerBytes.Length);
                stream.Write(body, 0, body.Length);
                stream.Flush();
                client.Close();
            } catch (Exception ex) {
                Console.WriteLine("ERR: " + ex.Message);
            }
        }
    }
}
'@

[RawServer]::Start($PSScriptRoot, 3000)
