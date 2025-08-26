import style from "./style/header.module.css"
export default function Header(){
    return (
      <header className={style.myHeader}>
        <div className={style.logo}>
          <img src="logo.png" alt="logo" width="80px" />
          <div className={style.logoTexto}>
            <p className={style.seu}>Seu</p>
            <p>condomínio</p>
          </div>
        </div>
      </header>
    );
}