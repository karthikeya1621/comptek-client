import Image from 'next/image';
import styles from './Header.module.scss';
import logoImage from '@images/logo_image.png';
import logoText from '@images/logo_text.png';
import { resize } from 'utils/variables';

export default function Header() {
    return <div className={styles.Header}>
        <div></div>
        <header className="mainContainer">
            <div className="midContainer flex justify-between h-full">
                <div className={styles.Logo}>
                    <div className={styles.LogoImage}><Image objectFit="contain" width={resize(61, 'headerHeight')} height={resize(96, 'headerHeight')} src={logoImage} /></div>
                    <div className={styles.LogoText}><Image objectFit="contain" width={resize(210, 'headerHeight')} height={resize(48, 'headerHeight')} src={logoText} /></div>
                </div>
                <div className="flex">
                    <div className={styles.Menu}>
                        <nav>
                            <li>About</li>
                            <li>Products</li>
                            <li>Focus</li>
                            <li>Clientele</li>
                            <li>Contact</li>
                        </nav>
                    </div>
                    <div className={styles.SocialLinks}>
                        <span></span>
                        <span></span>
                        <div className="flex">
                            <a href="#"><span className="mdi mdi-facebook"></span></a>
                            <a href="#"><span className="mdi mdi-linkedin"></span></a>
                            <a href="#"><span className="mdi mdi-youtube"></span></a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
}