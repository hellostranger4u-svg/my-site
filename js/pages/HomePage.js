import { renderGradeSelector } from '../components/GradeSelector.js';

export function renderHomePage() {
  return `
    <section class="hero">
      <h1>오늘의 한 권 📖</h1>
      <p>학년을 선택하면 매일 한 권의 추천 도서를 만나볼 수 있어요!</p>
    </section>
    ${renderGradeSelector()}`;
}
