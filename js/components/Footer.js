export function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="footer">
      <div class="container">
        <p>&copy; ${year} 오늘의 한 권 &mdash; 매일 한 권, 읽는 습관을 만들어요 📚</p>
      </div>
    </footer>`;
}
