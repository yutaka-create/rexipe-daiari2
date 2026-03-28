/**
 * ページトップ戻るボタンの制御
 * requestAnimationFrame を使用して、スクロールイベントの負荷を最小限に抑える
 */
function initPageTop() {
  const pageTopBtn = document.querySelector('.js-pagetop');

  // ガード句：ボタンが存在しないページでは実行しない
  if (!pageTopBtn) return;

  let isRunning = false; // スロットリング用のフラグ

  // 1. スクロール時の表示・非表示制御
  window.addEventListener('scroll', () => {
    // 描画の準備ができていない場合はスキップ
    if (!isRunning) {
      isRunning = true;

      // ブラウザの描画タイミング（通常60fps）に合わせて実行
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;

        if (scrollY > 300) {
          pageTopBtn.classList.add('is-show');
        } else {
          pageTopBtn.classList.remove('is-show');
        }

        isRunning = false; // 処理完了後にフラグをリセット
      });
    }
  }, { passive: true }); // パフォーマンス向上のためのオプション

  // 2. クリック時のスムーズスクロール制御
  pageTopBtn.addEventListener('click', (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}