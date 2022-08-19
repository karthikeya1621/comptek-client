import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_URL, ARG_POPULATE_DEEP } from "utils/constants";
import styles from "../../styles/FocusPage.module.scss";

// Images
import bgImage1 from '@images/bg_image_1.png';

export const tabWhitelist = ['industrial', 'design', 'ems'];

export default function FocusTab() {
    const router = useRouter();

    const [industrialData, setIndustrialData] = useState(null);
    const [designData, setDesignData] = useState(null);
    const [emsData, setEmsData] = useState(null);
    const [tab, setTab] = useState(tabWhitelist[0] || 'industrial');

    useEffect(() => {
        if (!tab || !tabWhitelist.includes(tab.toLowerCase())) {
            router.push("/focus/" + tabWhitelist[0]);
        } else {
            fetchData();
        }
    }, [tab]);

    useEffect(() => {
        if (router.query && router.query.tab) {
            setTab(router.query.tab);
        }
    }, [router.query]);

    const fetchData = async () => {
        const { data } = await axios.get(`${API_URL}/${tab}?${ARG_POPULATE_DEEP}`);
        if (tab == 'industrial')
            setIndustrialData(data && data.data && data.data.attributes ? data.data.attributes : null);
        if (tab == 'design')
            setDesignData(data && data.data && data.data.attributes ? data.data.attributes : null);
        if (tab == 'ems')
            setEmsData(data && data.data && data.data.attributes ? data.data.attributes : null);

        console.log('Tab', tab);
    }

    return <div className={styles.FocusPage}>
        <div className="flex bg-gray-100 px-3 py-2 text-gray-800 justify-center items-center shadow-md">
            {tabWhitelist.map((link, li) =>
                <Link key={`link${li}`} href={`/focus/${link}`}>
                    <a className={`mx-3 hover:text-brand text-sm uppercase ${tab == link ? 'text-brand' : ''}`}>{link}</a>
                </Link>)}
        </div>

        {/* Industrial */}
        {tab == 'industrial' && industrialData ? <div className={styles.Industrial}>
            <div className="w-full relative">
                <div className="absolute w-[70%] h-full right-10">
                    <Image layout="fill" objectFit="contain" objectPosition="center" src={industrialData?.content[0].image.data.attributes.url} />
                </div>
                <div className="contentContainer flex items-center bg-white-100" style={{ minHeight: '400px' }}>
                    <div className={styles.ContentOne}>
                        <span className="BrandDot"></span>
                        <span className="BrandDot"></span>
                        <h5>01</h5>
                        <p dangerouslySetInnerHTML={{ __html: industrialData?.content[0].para }}></p>
                    </div>
                </div>
            </div>
            <div className="w-full relative bg-brand text-white">
                <div className="BrandBg">
                    <Image src={bgImage1} layout="responsive" objectFit="contain" />
                </div>
                <div className="contentContainer">
                    <div className="grid grid-cols-2 py-6">
                        <div className="col-sapn-1 flex items-center" dangerouslySetInnerHTML={{ __html: industrialData?.content[1].para }}>

                        </div>
                        <div className="col-sapn-1 flex justify-end">
                            <div className="relative z-10 top-10 shadow-md"><Image width={300} height={240} src={industrialData?.content[1].image.data.attributes.url} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full relative bg-gray-50">
                <div className="contentContainer">
                    <div className="grid grid-cols-2 py-10">
                        <div className="col-span-1 py-6 flex justify-center items-center">
                            <div className="shadow"><Image width={340} height={260} objectFit="cover" src={industrialData?.content[2].image.data.attributes.url} /></div>
                        </div>
                        <div className="col-span-1 py-6 flex items-center">
                            <div className={styles.ContentTwo}><p dangerouslySetInnerHTML={{ __html: industrialData?.content[2].para }}></p><h5>02</h5></div>
                        </div>
                        <div className="col-span-1 py-6 flex items-center">
                            <div className={styles.ContentTwo} dangerouslySetInnerHTML={{ __html: industrialData?.content[3].para }}></div>
                        </div>
                        <div className="col-span-1 py-6 flex justify-center items-center">
                            <div className="shadow"><Image width={340} height={260} objectFit="cover" src={industrialData?.content[3].image.data.attributes.url} /></div>
                        </div>
                        <div className="col-span-1 py-6 flex justify-center items-center">
                            <div className="shadow"><Image width={340} height={260} objectFit="cover" src={industrialData?.content[4].image.data.attributes.url} /></div>
                        </div>
                        <div className="col-span-1 py-6 flex items-center">
                            <div className={styles.ContentTwo} dangerouslySetInnerHTML={{ __html: industrialData?.content[4].para }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full relative bg-brand">
                <div className="BrandBg _Left">
                    <Image src={bgImage1} layout="responsive" objectFit="contain" />
                </div>
                <div className="contentContainer py-6">
                    <div className="sectionCount my-6 mx-auto">
                        <span className="sectionNumber text-white/30">03</span>
                        <h2 className="text-white">Quality Program</h2>
                    </div>
                    <div className="grid grid-cols-2 px-12 py-8 bg-white rounded shadow-xl mb-6">
                        <div className="col-span-1 relative h-full text-sm flex items-center">
                            <p dangerouslySetInnerHTML={{ __html: industrialData?.qualityProgram?.content }}></p>
                        </div>
                        <div className="col-span-1 relative h-full flex items-center justify-center">
                            {industrialData?.qualityProgram?.badges.map((badge, bi) => <div key={`badge${bi}`} className="flex flex-col text-center text-sm mx-3">
                                <Image width={150} height={150} src={badge.image.data.attributes.url} objectFit="contain" />
                                <span className="my-2">{badge.title}</span>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div> : <></>}

        {/* Design */}
        {tab == 'design' && designData ? <div className={styles.Design}>
            <div className="w-full relative py-4">
                <div className="w-full absolute h-full">
                    <Image layout="fill" objectFit="cover" src={designData?.content[0].image.data.attributes.url} />
                </div>
                <div className="relative contentContainer">
                    <div className={styles.ContentOne}>
                        <span className="BrandDot"></span>
                        <span className="BrandDot"></span>
                        <h5>01</h5>
                        <p dangerouslySetInnerHTML={{ __html: designData?.content[0].para }}></p>
                    </div>
                </div>
            </div>
            <div className="w-full relative bg-brand text-white">
                <div className="BrandBg">
                    <Image src={bgImage1} layout="responsive" objectFit="contain" />
                </div>
                <div className="contentContainer">
                    <div className="grid grid-cols-2 py-6">
                        <div className="col-sapn-1 flex items-center" dangerouslySetInnerHTML={{ __html: designData?.content[1].para }}>

                        </div>
                        <div className="col-sapn-1 flex justify-end">
                            <div className="relative z-10 top-10 shadow-md"><Image width={300} height={240} src={designData?.content[1].image.data.attributes.url} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full relative bg-gray-50">
                <div className="contentContainer">
                    <div className="grid grid-cols-2 py-10">
                        <div className="col-span-1 py-6 flex justify-center items-center">
                            <div className="shadow"><Image width={340} height={260} objectFit="cover" src={designData?.content[2].image.data.attributes.url} /></div>
                        </div>
                        <div className="col-span-1 py-6 flex items-center">
                            <div className={styles.ContentTwo}><p dangerouslySetInnerHTML={{ __html: designData?.content[2].para }}></p><h5>02</h5></div>
                        </div>
                        <div className="col-span-1 py-6 flex items-center">
                            <div className={styles.ContentTwo} dangerouslySetInnerHTML={{ __html: designData?.content[3].para }}></div>
                        </div>
                        <div className="col-span-1 py-6 flex justify-center items-center">
                            <div className="shadow"><Image width={340} height={260} objectFit="cover" src={designData?.content[3].image.data.attributes.url} /></div>
                        </div>
                        <div className="col-span-1 py-6 flex justify-center items-center">
                            <div className="shadow"><Image width={340} height={260} objectFit="cover" src={designData?.content[4].image.data.attributes.url} /></div>
                        </div>
                        <div className="col-span-1 py-6 flex items-center">
                            <div className={styles.ContentTwo} dangerouslySetInnerHTML={{ __html: designData?.content[4].para }}></div>
                        </div>
                        <div className="col-span-1 py-6 flex items-center">
                            <div className={styles.ContentTwo} dangerouslySetInnerHTML={{ __html: designData?.content[5].para }}></div>
                        </div>
                        <div className="col-span-1 py-6 flex justify-center items-center">
                            <div className="shadow"><Image width={340} height={260} objectFit="cover" src={designData?.content[5].image.data.attributes.url} /></div>
                        </div>
                        <div className="col-span-1 py-6 flex justify-center items-center">
                            <div className="shadow"><Image width={340} height={260} objectFit="cover" src={designData?.content[6].image.data.attributes.url} /></div>
                        </div>
                        <div className="col-span-1 py-6 flex items-center">
                            <div className={styles.ContentTwo} dangerouslySetInnerHTML={{ __html: designData?.content[6].para }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full relative bg-brand text-white">
                <div className="BrandBg _Left">
                    <Image src={bgImage1} layout="responsive" objectFit="contain" />
                </div>
                <div className="contentContainer grid grid-cols-2 gap-3">
                    <div className="col-span-1 px-4 py-3" dangerouslySetInnerHTML={{ __html: designData?.content[7].para }}></div>
                    <div className="col-span-1 px-4 py-3" dangerouslySetInnerHTML={{ __html: designData?.content[8].para }}></div>
                    <div className="col-span-1 px-4 py-3" dangerouslySetInnerHTML={{ __html: designData?.content[9].para }}></div>
                    <div className="col-span-1 px-4 py-3" dangerouslySetInnerHTML={{ __html: designData?.content[10].para }}></div>
                </div>
            </div>
        </div> : <></>}

        {/* EMS */}
        {tab == 'ems' && emsData ? <div className={styles.EMS}>
            <div className="w-full relative">
                <div className="absolute w-[70%] h-full right-10">
                    <Image layout="fill" objectFit="contain" objectPosition="center" src={emsData?.content[0].image.data.attributes.url} />
                </div>
                <div className="contentContainer flex items-center bg-white-100" style={{ minHeight: '400px' }}>
                    <div className={styles.ContentOne}>
                        <span className="BrandDot"></span>
                        <span className="BrandDot"></span>
                        <h5>01</h5>
                        <p dangerouslySetInnerHTML={{ __html: emsData?.content[0].para }}></p>
                    </div>
                </div>
            </div>
            <div className="w-full relative bg-brand text-white">
                <div className="BrandBg">
                    <Image src={bgImage1} layout="responsive" objectFit="contain" />
                </div>
                <div className="contentContainer">
                    <div className="grid grid-cols-2 py-6">
                        <div className="col-sapn-1 flex items-center" dangerouslySetInnerHTML={{ __html: emsData?.content[1].para }}>

                        </div>
                        <div className="col-sapn-1 flex justify-end">
                            <div className="relative z-10 top-10 shadow-md"><Image width={300} height={240} src={emsData?.content[1].image.data.attributes.url} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full relative bg-gray-50">
                <div className="contentContainer">
                    <div className="grid grid-cols-2 py-10">
                        <div className="col-span-1 py-6 flex justify-center items-center">
                            <div className="shadow"><Image width={340} height={260} objectFit="cover" src={emsData?.content[2].image.data.attributes.url} /></div>
                        </div>
                        <div className="col-span-1 py-6 flex items-center">
                            <div className={styles.ContentTwo}><p dangerouslySetInnerHTML={{ __html: emsData?.content[2].para }}></p><h5>02</h5></div>
                        </div>
                        <div className="col-span-1 py-6 flex items-center">
                            <div className={styles.ContentTwo} dangerouslySetInnerHTML={{ __html: emsData?.content[3].para }}></div>
                        </div>
                        <div className="col-span-1 py-6 flex justify-center items-center">
                            <div className="shadow"><Image width={340} height={260} objectFit="cover" src={emsData?.content[3].image.data.attributes.url} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full relative bg-brand">
                <div className="BrandBg _Left">
                    <Image src={bgImage1} layout="responsive" objectFit="contain" />
                </div>
                <div className="contentContainer py-6">
                    <div className="sectionCount my-6 mx-auto">
                        <span className="sectionNumber text-white/30">03</span>
                        <h2 className="text-white">EMS Process and Control</h2>
                    </div>
                    <div className="flex items-center justify-center px-12 py-8 mb-6 relative h-[600px]">
                        <Image height={600} width={1000} src={'https://comptek-files.s3.ap-south-1.amazonaws.com/ems9_de6bcfdbac.png?updated_at=2022-07-25T10:26:21.060Z'} layout="fill" objectFit="contain"  />
                    </div>
                </div>
            </div>
        </div> : <></>}
    </div>;
}
