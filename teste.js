document.addEventListener("DOMContentLoaded", () => {
    const feed = document.getElementById("pinterestFeed");

    async function carregarPins() {
      try {
        const resposta = await fetch('https://back-spider.vercel.app/publicacoes/listarPublicacoes');
        if (!resposta.ok) throw new Error('Erro ao buscar publicações');

        const publicacoes = await resposta.json();

        if (!Array.isArray(publicacoes)) throw new Error("Resposta inesperada da API");

        feed.innerHTML = '';

        publicacoes.forEach(post => {
          if (!post.imagem) return;

          const card = document.createElement("div");
          card.classList.add("pinterest-card");

          card.innerHTML = `
            <img src="${post.imagem}" alt="Imagem">
            <div class="actions">
              <div class="left">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-regular fa-comment"></i>
                <i class="fa-regular fa-paper-plane"></i>
              </div>
              <div class="right">
                <i class="fa-regular fa-bookmark"></i>
              </div>
            </div>
            <div class="desc">${post.descricao || ''}</div>
          `;

          const heartIcon = card.querySelector('.fa-heart');
          heartIcon.addEventListener('click', () => {
            heartIcon.classList.toggle('fa-regular');
            heartIcon.classList.toggle('fa-solid');
            heartIcon.classList.toggle('liked');
          });

          feed.appendChild(card);
        });
      } catch (err) {
        console.error('Erro ao carregar pins:', err);
        feed.innerHTML = "<p style='text-align:center'>Erro ao carregar imagens 😢</p>";
      }
    }

    carregarPins();
  });