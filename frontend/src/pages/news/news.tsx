import { useState, useEffect } from "react";
import { getNews } from "@/api";
import type { NewsItem } from "@/api";
import NewsCard from "@/components/NewsCard/NewsCard";
import styles from "./news.module.css";

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  window.addEventListener("keydown", handleEsc);

  return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleClose = () => {
  setIsClosing(true);
  setTimeout(() => {
    setSelectedNews(null);
    setIsClosing(false);
    }, 300); // = длительность анимации
  };

  const mockNews: NewsItem[] = [
    {
      id: 1,
      data: {
        title: "Aaaaaaaaarch!!!!!!!!!! lllinux",
        text: "A simple, lightweight distribution. You've reached the website for Arch Linux, a lightweight and flexible Linux® distribution that tries to Keep It Simple. Currently we have official packages optimized for the x86-64 architecture. We complement our official package sets with a community-operated package repository that grows in size and quality each and every day. Our strong community is diverse and helpful, and we pride ourselves on the range of skillsets and uses for Arch that stem from it. Please check out our forums and mailing lists to get your feet wet. Also glance through our wiki if you want to learn more about Arch. A simple, lightweight distribution. You've reached the website for Arch Linux, a lightweight and flexible Linux® distribution that tries to Keep It Simple. Currently we have official packages optimized for the x86-64 architecture. We complement our official package sets with a community-operated package repository that grows in size and quality each and every day. Our strong community is diverse and helpful, and we pride ourselves on the range of skillsets and uses for Arch that stem from it. Please check out our forums and mailing lists to get your feet wet. Also glance through our wiki if you want to learn more about Arch. A simple, lightweight distribution. You've reached the website for Arch Linux, a lightweight and flexible Linux® distribution that tries to Keep It Simple. Currently we have official packages optimized for the x86-64 architecture. We complement our official package sets with a community-operated package repository that grows in size and quality each and every day. Our strong community is diverse and helpful, and we pride ourselves on the range of skillsets and uses for Arch that stem from it. Please check out our forums and mailing lists to get your feet wet. Also glance through our wiki if you want to learn more about Arch. A simple, lightweight distribution. You've reached the website for Arch Linux, a lightweight and flexible Linux® distribution that tries to Keep It Simple. Currently we have official packages optimized for the x86-64 architecture. We complement our official package sets with a community-operated package repository that grows in size and quality each and every day. Our strong community is diverse and helpful, and we pride ourselves on the range of skillsets and uses for Arch that stem from it. Please check out our forums and mailing lists to get your feet wet. Also glance through our wiki if you want to learn more about Arch.",
        created_at: "2026-03-20",
        status: "upcoming",
        image: "https://i.redd.it/3fkqlzr9vhq11.png",
      },
    },
    {
      id: 2,
      data: {
        title: "Pixel Phone / NePixel Phone",
        text: "🐛 Решение проблем     Frontend не подключается к Backend Убедитесь, что backend запущен: docker compose ps       Проверьте логи: docker compose logs backend        Проверьте CORS настройки в backend/main.py/nОшибки базы данных/nПересоздайте БД: docker compose down -v && docker compose up --build/nПроверьте логи PostgreSQL: docker compose logs postgres",
        created_at: "2026-03-10",
        status: "past",
        image: "https://cdn.mos.cms.futurecdn.net/rhdD2ndsU9ACnfjWeczvsJ.jpg",
      },
    },
    {
      id: 3,
      data: {
        title: "Новый CTF от Яндекса",
        text: "Будет много задач по reverse и web 👀",
        created_at: "2026-03-18",
        status: "upcoming",
        image: "https://jhalon.github.io/images/google-ctf-banner.jpg",
      },
    },
    {
      id: 4,
      data: {
        title: "CTF Moscow 2026 стартует!",
        text: "Регистрация уже открыта. Участвуйте и побеждайте 🔥",
        created_at: "2026-03-20",
        status: "upcoming",
      },
    },
    {
      id: 5,
      data: {
        title: "Итоги CyberBattle 2026",
        text: "Команда pwned заняла первое место 🏆",
        created_at: "2026-03-10",
        status: "past",
      },
    },
    {
      id: 6,
      data: {
        title: "Новый CTF от Яндекса",
        text: "Будет много задач по reverse и web 👀 Будет много задач по reverse и web 👀 Будет много задач по reverse и web 👀 Будет много задач по reverse и web 👀",
        created_at: "2026-03-18",
        status: "upcoming",
      },
    },
    {
      id: 7,
      data: {
        title: "CTF Moscow 2026 стартует!",
        text: "Регистрация уже открыта. Участвуйте и побеждайте 🔥",
        created_at: "2026-03-20",
        status: "upcoming",
      },
    },
    {
      id: 8,
      data: {
        title: "Итоги CyberBattle 2026",
        text: "Команда pwned заняла первое место 🏆 ",
        created_at: "2026-03-10",
        status: "past",
      },
    },
    {
      id: 9,
      data: {
        title: "Новый CTF от Яндекса",
        text: "Будет много задач по reverse и web 👀",
        created_at: "2026-03-18",
        status: "upcoming",
      },
    },
    {
      id: 10,
      data: {
        title: "Итоги CyberBattle 2026",
        text: "Команда pwned заняла первое место 🏆 ",
        created_at: "2026-03-10",
        status: "past",
      },
    },
    {
      id: 11,
      data: {
        title: "Новый CTF от Яндекса",
        text: "Будет много задач по reverse и web 👀",
        created_at: "2026-03-18",
        status: "upcoming",
      },
    },
    {
      id: 12,
      data: {
        title: "Итоги CyberBattle 2026",
        text: "Команда pwned заняла первое место 🏆 ",
        created_at: "2026-03-10",
        status: "past",
      },
    },
    {
      id: 13,
      data: {
        title: "Новый CTF от Яндекса",
        text: "Будет много задач по reverse и web 👀",
        created_at: "2026-03-18",
        status: "upcoming",
      },
    },
  ];

  useEffect(() => {
    loadNews();
  }, [filter]);

  const loadNews = async () => {
    try {
      setLoading(true);
      setNews(mockNews)
      // let data;
      // data = await getNews();

      // setNews(data);
    } catch (error) {
      console.error("Error loading news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.newsPage}>
      <header className={styles.newsHeader}>
        <h1 className="text3xl fontBold textWhite">
          Актуальные новости о предстоящих и прошедших CTF соревнованиях
        </h1>
      </header>
      {loading ? (
        <div className={styles.loading}>Загрузка новостей...</div>
      ) : (
        <div className={styles.newsLayout}>
  
          {/* LEFT */}
          <div className={styles.newsSidebar}>
            {news.map((item) => (
              <NewsCard
                key={item.id}
                id={item.id}
                title={item.data.title}
                content={item.data.text}
                date={item.data.created_at}
                type={item.data.status}
                compact

                isActive={selectedNews?.id === item.id}
                onClick={() => setSelectedNews(item)}
              />
            ))}
          </div>

          {/* RIGHT */}
          <div className={styles.newsViewer}>
            {selectedNews ? (
              <>
                <h2>{selectedNews.data.title}</h2>
                <p className={styles.modalDate}>{selectedNews.data.created_at}</p>

                {selectedNews.data.image && (
                  <div className={styles.modalImage}>
                    <img src={selectedNews.data.image} alt="" />
                  </div>
                )}

                <p className={styles.modalText}>{selectedNews.data.text}</p>
              </>
            ) : (
              <p>Выберите новость 👈</p>
            )}
          </div>

        </div>
      )}

      {!loading && news.length === 0 && (
        <div className={styles.emptyState}>
          <p>Новости не найдены</p>
        </div>
      )}

      {/* {selectedNews && (
        <div
          className={`${styles.modalOverlay} ${isClosing ? styles.modalOverlayClosing : ""}`}
          onClick={handleClose}
        >
          <div
            className={`${styles.modal} ${isClosing ? styles.modalClosing : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>
                {selectedNews.data.title}
              </h2>

                {selectedNews.data.image && (
                  <div className={styles.modalImage}>
                    <img src={selectedNews.data.image} alt="" />
                  </div>
                )}

              <p className={styles.modalDate}>
                {selectedNews.data.created_at}
              </p>

              <div className={styles.modalText}>
                {selectedNews.data.text}
              </div>
            </div>

            <button onClick={() => setSelectedNews(null)}>
              Закрыть
            </button>
          </div>
        </div>
      )} */}

      
    </div>
  );
}
