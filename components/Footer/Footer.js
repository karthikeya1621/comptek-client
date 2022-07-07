import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, ARG_POPULATE_DEEP } from "utils/constants";
import { resize } from "utils/variables";
import logoImage from '@images/logo_image.png';
import logoText from '@images/logo_text.png';
import styles from './Footer.module.scss';
import Image from "next/image";
import Link from "next/link";

export default function Footer() {

    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            setIsDataLoaded(true);
            console.log(data);
        }
    }, [data]);

    const fetchData = async () => {
        const { data } = await axios.get(`${API_URL}/footer?${ARG_POPULATE_DEEP}`)
        setData(data && data.data && data.data.attributes ? data.data.attributes : null);
    }

    return <footer className={styles.Footer}>
        <div className="contentContainer">
            {isDataLoaded ? <div className="grid grid-cols-6 gap-3">
                <div className="col-span-1">
                    <div className={styles.Logo}>
                        <div className={styles.LogoImage}><Image objectFit="contain" width={resize(61, 'headerHeight')} height={resize(96, 'headerHeight')} src={logoImage} /></div>
                        <div className={styles.LogoText}><Image objectFit="contain" width={resize(210, 'headerHeight')} height={resize(48, 'headerHeight')} src={logoText} /></div>
                    </div>
                </div>
                <div className="col-span-1 px-10 py-3 border-t">
                    {data.menuLinks.map((item, index) => <h6 className="text-gray-600 hover:text-black" key={`menuLink${index}`}>
                        <Link passHref={true} href={item.linkUrl}>{item.linkName}</Link>
                    </h6>)}
                </div>
                <div className="col-span-2 px-3 py-3 border-t">
                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: data.address }}></p>
                    <br></br>
                    <br></br>
                    <a className="text-brand" href={`tel:${data.phone}`}>{data.phone}</a>
                    <br></br>
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                </div>
                <div className="col-span-2 py-3 px-5 text-center text-gray-700 border-t border-brand">
                    <span className="text-3xl text-brand font-extrabold block pb-2 mb-2 border-b border-brand">CEMILAC</span>
                    <small>{data.cemilacCaption}</small>
                </div>
            </div> : <></>}
        </div>
    </footer>
}