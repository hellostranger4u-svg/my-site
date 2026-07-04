export function renderHeader() {
  return `
    <header class="header">
      <div class="container header__inner">
        <a class="header__logo" href="#" data-navigate="home">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            <line x1="8" y1="7" x2="16" y2="7"/>
            <line x1="8" y1="11" x2="13" y2="11"/>
          </svg>
          오늘의 한 권
        </a>
        <nav class="header__nav">
          <button class="btn btn--outline" style="color:#fff;border-color:rgba(255,255,255,.4);padding:8px 18px;font-size:13px;" data-navigate="home">
            학년 선택
          </button>
        </nav>
      </div>
    </header>`;
}
