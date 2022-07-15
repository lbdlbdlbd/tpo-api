import './header.css'
import headerimg2 from './headerimg2.jpg';

export default function Header() {
  return (
    <div className='header'>
        <div className='headerTitles'>
            <span className='headerTitleSm'>Recetas fáciles y prácticas</span>
            <span className='headerTitleLg'>Mi Recetario</span>
        </div>
        <img className="headerImg" src={headerimg2} alt=""/>
    </div>
  )
}
