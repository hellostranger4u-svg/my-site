const GRADE_COLORS = [
  'var(--accent)',
  'var(--green)',
  'var(--yellow)',
  'var(--primary)',
  'var(--accent)',
  'var(--green)',
];

const GRADE_EMOJI = ['🌱', '🌿', '🌻', '🌳', '⭐', '🚀'];

export function renderGradeSelector() {
  const cards = Array.from({ length: 6 }, (_, i) => {
    const grade = i + 1;
    const color = GRADE_COLORS[i];
    return `
      <button class="grade-card card" data-grade="${grade}" style="--grade-color:${color}">
        <span class="grade-card__emoji">${GRADE_EMOJI[i]}</span>
        <span class="grade-card__label">${grade}학년</span>
        <span class="grade-card__sub">추천 도서 보기</span>
      </button>`;
  }).join('');

  return `
    <section class="grade-grid container">
      ${cards}
    </section>`;
}
