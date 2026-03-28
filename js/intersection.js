/**
 * スクロール監視アニメーション制御
 * 監視対象が画面内に入った際にアニメーションを開始し、完了後にリソースを解放する
 */
function initIntersection() {
  const targets = document.querySelectorAll('.js-scroll-trigger');

  // ターゲットが存在しない場合は処理を中断（ガード句）
  if (targets.length === 0) return;

  const options = {
    root: null, // ビューポートを基準にする
    rootMargin: '0px 0px -20% 0px', // 画面下から20%の位置で発火
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // 1. アニメーションクラスを付与
        el.classList.add('is-animated');

        // 2. 監視を即座に解除（1回きりの演出のためブラウザの負荷を減らす）
        observer.unobserve(el);

        // 3. will-change のクリーンアップ処理
        // transition（またはanimation）が完了したタイミングを検知
        el.addEventListener('transitionend', () => {
          // CSSで指定した will-change を初期化してGPUメモリを解放
          el.style.willChange = 'auto';
        }, { once: true }); // 重要：リスナー自体も1回実行後に自動削除する
      }
    });
  }, options);

  targets.forEach(target => {
    observer.observe(target);
  });
}