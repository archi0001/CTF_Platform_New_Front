import { useState, useEffect } from "react";

import styles from "./profile.module.css";

//import UserService from "@/services/UserService";
import { store } from "@/App";
import type { IUser } from "@/models/response/IUser";

import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();


  const mockUser: IUser = {
    data: {
      firstname: "Иван",
      lastname: "Иванов",
      secondname: "Иванович",
      email: "ivan@example.com",
      organization: "ГУАП",
      contact: "+7 999 123-45-67",
      bio: " школа не сцепление, можно и кинуть. если жизнь - это вызов, то я перезвоню. я так много читал о вреде алкоголя, что решил бросить читать. не знаешь, как поступить, поступи как знаешь. девушки как кредит, кому-то дают, а кому-то нет. пары - не удары, можно и пропустить.. пиво,водка, турничок через часик я качок.. у меня с собой две пушки, одна огнестрел, другая для подружки.. настоящий мужик на руках носит только ящик пива, а не свою кралю. дают - бери, не дают - отбери ",
    },
  } as IUser;


  const loadProfile = async () => {
          setUser(mockUser);
    // try {
    //   const res = await UserService.fetchUser();
    //   setUser(res.data);
    // } catch (error) {
    //   console.log(":3");
    // }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleLogout = async () => {
    store.logout();
    navigate("/");
  };

  if (!user?.data)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );

  return (
    <div className={styles.profile}>
      <div className={styles.profileContainer}>
        <div className={styles.rightColumn}>
          <div className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <h3>Личная информация</h3>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <div>
                  <label>ФИО</label>
                  <p className={styles.infoValue}>
                    {[
                      user.data.lastname,
                      user.data.firstname,
                      user.data.secondname,
                    ].join(" ")}
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div>
                  <label>Почта</label>
                  <p className={styles.infoValue}>{user.data.email}</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div>
                  <label>ВУЗ</label>
                  <p className={styles.infoValue}>
                    {user.data.organization || "Не указано"}
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                  <label>Контакт</label>
                  <p className={styles.infoValue}>{user.data.contact}</p>
              </div>
            </div>

            
          </div>

          <div className={styles.aboutCard}>
            <h3>О себе</h3>
            <p className={styles.aboutText}>{user.data.bio}</p>
            <button className={styles.editAboutButton}>
              Редактировать информацию
            </button>
          </div>

          <div className={styles.actions}>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Выйти из профиля
              </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
