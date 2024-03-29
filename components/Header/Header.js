import Image from 'next/image';
import styles from './Header.module.scss';
import logoImage from '@images/logo_image.png';
import logoText from '@images/logo_text.png';
import { resize } from 'utils/variables';
import Link from "next/link";
import { tabWhitelist } from "pages/focus/[tab]";

export default function Header() {
    return <div className={styles.Header}>
        <div></div>
        <header className="mainContainer">
            <div className="midContainer flex justify-between h-full">
                <Link href="/" passHref={true}>
                    <a className={styles.Logo}>
                        <div className={styles.LogoImage}><Image objectFit="contain" width={resize(61, 'headerHeight')} height={resize(96, 'headerHeight')} src={logoImage} /></div>
                        <div className={styles.LogoText}><Image objectFit="contain" width={resize(210, 'headerHeight')} height={resize(48, 'headerHeight')} src={logoText} /></div>
                    </a></Link>
                <div className="flex">
                    <div className={styles.Menu}>
                        <nav>
                            <li><Link href="/about" passHref={true}><a>About</a></Link></li>
                            <li><Link href="/products" passHref={true}><a>Products</a></Link></li>
                            <li><Link href={"/focus/" + tabWhitelist[0]} passHref={true}><a>Focus</a></Link></li>
                            <li><Link href="/clientele" passHref={true}><a>Clientele</a></Link></li>
                            <li><Link href="/contact" passHref={true}><a>Contact</a></Link></li>
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