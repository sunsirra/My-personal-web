// js.js
function createHearts() {
    const container = document.querySelector('.falling-hearts');
    container.innerHTML = '';
    
    for (let i = 0; i < 25; i++) {
      const heart = document.createElement('span');
      heart.style.cssText = `
        left: ${Math.random() * 100}vw;
        animation-delay: ${Math.random() * 8}s;
        font-size: ${20 + Math.random() * 15}px;
        opacity: ${0.3 + Math.random() * 0.7};
      `;
      heart.innerHTML = '❤';
      container.appendChild(heart);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    createHearts();
  
    // 背景点击特效
    document.addEventListener('click', (e) => {
      if (e.target.closest('.button')) return;
      
      const heart = document.createElement('div');
      heart.className = 'click-heart';
      heart.style.left = e.pageX + 'px';
      heart.style.top = e.pageY + 'px';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    });
  
    // 按钮交互
    const yesBtn = document.querySelector('.button.yes');
    const noBtn = document.querySelector('.button.no');
    let shrinkCount = 1;
    const maxShrink = 0.4;
    const maxGrow = 2;
  
    yesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      yesBtn.style.animation = 'none';
      setTimeout(() => yesBtn.style.animation = 'pulse 1.5s infinite', 10);
      //新增照片恢复
      const photo = document.querySelector('.photo');
      const img = photo.querySelector('img');

      if(photo.classList.contains('crying')) {
        photo.classList.remove('crying');
        photo.style.transform = 'scale(1)';
        img.src = 'img/想不想我.jpg';
        photo.style.animation = 'float 1s ease';
        setTimeout(() => photo.style.animation = '', 1000);
      }
      alert("💕 全世界最好的帅气哥哥！\n嘴一个～");
    });
  
    noBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const photo = document.querySelector('.photo');
      const img = photo.querySelector('img');
      const currentYesScale = parseFloat(yesBtn.style.transform.replace(/[^0-9.]/g, '')) || 1;
      const currentNoScale = parseFloat(noBtn.style.transform.replace(/[^0-9.]/g, '')) || 1;
      
      // 同步执行所有效果
      requestAnimationFrame(() => {
        photo.classList.add('crying');
        photo.style.transform = `scale(0.8) rotate(3deg)`;
        img.src = 'img/你再想想呢.jpg';
        photo.style.animation = 'shake 0.5s ease';
        
        yesBtn.style.transform = `scale(${Math.min(currentYesScale * 1.2, maxGrow)})`;
        noBtn.style.transform = `scale(${Math.max(currentNoScale * 0.8, maxShrink)})`;
        
        setTimeout(() => photo.style.animation = '', 500);
      });

      setTimeout(() => {
        const messages = [
        //   `你忍心让我缩小${Math.round((1 - currentNoScale)*100)}%吗😭`,
          
          "鼠鼠我呀 要碎掉了捏💔",
          `小张我要急眼啦`,
          "呜呜怎么可以不想我呢",
          "点错了对不对"
        ];
        alert(messages[Math.floor(Math.random() * messages.length)]);
      }, 500); // 等待动画完成
  
      // 移动和提示逻辑
      const maxMove = 100 - (shrinkCount * 20);
      const x = Math.random() * maxMove * 2 - maxMove;
      const y = Math.random() * maxMove - maxMove/2;
      noBtn.style.transform += ` translate(${x}px, ${y}px)`;
  
    //   const messages = [
    //     `你忍心让我缩小${Math.round((1 - currentNoScale)*100)}%吗😭`,
    //     "再点我要消失啦～",
    //     "我的小心脏要碎了💔",
    //     `这是第${shrinkCount}次伤害我了😢`,
    //     "真的不想我吗？",
    //     "点错了对不对？"
    //   ];
    //   alert(messages[Math.floor(Math.random() * messages.length)]);
      
      shrinkCount++;
    });
  
    noBtn.addEventListener('mouseleave', () => {
      noBtn.style.transform = noBtn.style.transform.replace(/translate\(.*?\)/g, '');
    });
  });

// 在DOM加载时预加载图片
const preloadImages = () => {
    new Image().src = 'img/你再想想呢.jpg';
  }
  document.addEventListener('DOMContentLoaded', preloadImages);