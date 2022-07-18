import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, ARG_POPULATE_DEEP } from "utils/constants";
import styles from "../styles/Products.module.scss";

// Images
import bgImage1 from '@images/bg_image_1.png';
import Image from "next/image";

export default function Products({ data }) {

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        if (data) {
            setIsDataLoaded(true);
            console.log(data);
        }
    }, []);

    return <div className={styles.Products}>
        <div className="w-full relative">
            <div className={styles.Banner}>
                <div className="sectionCount my-6 mx-auto">
                    <span className="sectionNumber text-white/30">01</span>
                    <h2 className="text-white">Comptek Products</h2>
                </div>
                <div className="BrandBg _Left">
                    <Image src={bgImage1} layout="responsive" objectFit="contain" />
                </div>
            </div>
        </div>
        <div className="contentContainer flex flex-wrap justify-between py-5">
            {data.products.map((product, index) => <div className={styles.Product} key={`prod${index}`}>
                <div className="grid grid-cols-2 w-full relative">
                    <div className="col-span-2 w-full h-48 relative p-6 flex justify-center items-center border-2">
                        <Image width={160} height={160} objectFit="contain" src={product.ProductImage.data.attributes.url} />
                    </div>
                    <div className="col-span-1 text-left p-2">{product.Features}</div>
                    <div className="col-span-1 text-right p-2">{product.Properties}</div>
                    <div className="col-span-1 text-left p-2 text-xl text-brand">{product.ProductName}</div>
                    <div className="col-span-1 text-right p-2" dangerouslySetInnerHTML={{__html: product.Description}}></div>
                </div>
            </div>)}
            {data.products.length % 2 == 1 ? <div className="relative block mr-auto"></div> : <></>}
        </div>
    </div>
}

export async function getStaticProps(context) {
    const { data } = await axios.get(`${API_URL}/product-page?${ARG_POPULATE_DEEP}`)
    return {
        props: {
            data: data && data.data && data.data.attributes ? data.data.attributes : null
        },
        revalidate: 10
    }
}