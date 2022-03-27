import Logo from "../../assets/logo-alt.png";

export default function Header() {
  return (
    <header>
      <img src={Logo} alt="Cineflex logo" />
      <p>CINEFLEX</p>
    </header>
  );
}
