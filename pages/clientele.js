import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { API_URL, ARG_POPULATE_DEEP } from "utils/constants";
import styles from "../styles/Clientele.module.scss";

// Images
import bgImage1 from '@images/bg_image_1.png';

export default function Clientele({ data }) {

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        if (data) {
            setIsDataLoaded(true);
            console.log(data);
        }
    }, []);

    return <div className={styles.Clientele}>
        {data.ClientGroups.map((group, index) => <div key={`group${index}`} className="w-full relative">
            <div className="w-full relative">
                <div className={styles.Banner}>
                    <div className="sectionCount my-6 mx-auto">
                        <span className="sectionNumber text-white/30">0{index + 1}</span>
                        <h2 className="text-white">{group.GroupName}</h2>
                    </div>
                    <div className="BrandBg">
                        <Image src={bgImage1} layout="responsive" objectFit="contain" />
                    </div>
                </div>
            </div>

            <div className="contentContainer flex justify-between py-5">
                {group.Clients.map((client, index) => <div className={styles.Client} key={`client${index}`}>
                    <div className="grid grid-cols-2 w-full relative">
                        <div className="col-span-2 w-full h-48 relative p-6 flex justify-center items-center border-2">
                            <Image width={160} height={160} objectFit="contain" src={client.ClientImage.data.attributes.url} />
                        </div>
                        <div className="col-span-2 text-center p-2">{client.ClientName}</div>
                    </div>
                </div>)}
                {group.Clients.length % 4 != 0 ? <div className="relative block mr-auto"></div> : <></>}
            </div>
        </div>)}
    </div>
}

export async function getStaticProps(context) {
    const { data } = await axios.get(`${API_URL}/clientele?${ARG_POPULATE_DEEP}`)
    return {
        props: {
            data: data && data.data && data.data.attributes ? data.data.attributes : null
        },
        revalidate: 10
    }
}