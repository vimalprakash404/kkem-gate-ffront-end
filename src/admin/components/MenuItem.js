import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./MenuItem.css";
const MenuITem =({icon,title,active})=>{
    return (
        <div className="btn" style={{width:"100%"}}>
            <div className={active === true ? ' item-active ' : 'item' }>
            <FontAwesomeIcon icon={icon} />
            <div className="item-title">
                {title}
            </div> 
            </div>
            
        </div>
    )
}

export default MenuITem;