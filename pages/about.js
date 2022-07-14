import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { API_URL, ARG_POPULATE_DEEP } from "utils/constants";
import { getServerImageUrl } from "utils/functions";
import styles from '../styles/About.module.scss';

// Images
import bgImage1 from '@images/bg_image_1.png';

export default function About({ data }) {

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        if (data) {
            setIsDataLoaded(true);
            console.log(data);
        }
    }, []);

    return <div className={styles.About}>
        <div className="midContainer">
            <div className={styles.SectionOne}>
                <div className="grid grid-cols-6">
                    <div className="col-span-3 flex items-center justify-end overflow-visible">
                        <div className={styles.ContentBox}>
                            <span className="text-gray-400/30 absolute text-8xl bottom-1 right-1 font-extrabold">01</span>
                            <div className="relative">
                                <h3 className="text-brand ml-5">{data.SectionOneTitle}</h3>
                                <span className="BrandDot"></span>
                                <span className="BrandDot"></span>
                            </div>
                            <p>{data.ContentOne}</p>
                        </div>
                    </div>
                    <div className="col-span-3 relative">
                        <Image layout="fill" src={getServerImageUrl(data.ContentOneBg.data.attributes.url)} />
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full relative bg-brand">
            <div className="midContainer">
                <div className="grid grid-cols-6">
                    <div className="col-span-3 flex items-center justify-end overflow-visible">
                        <div className={styles.ContentBox}>
                            <p dangerouslySetInnerHTML={{ __html: data.ContentTwo }}></p>
                        </div>
                    </div>
                    <div className="col-span-3 flex items-center justify-start overflow-visible">
                        <div className={styles.AboutImageTwo}>
                            <Image width={300} height={260} src={getServerImageUrl(data.ContentTwoBg.data.attributes.url)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="BrandBg">
                <Image src={bgImage1} layout="responsive" objectFit="contain" />
            </div>
        </div>

        <div className="contentContainer">
            <div className="grid grid-cols-6 gap-4">
                <div className="col-span-3 relative flex items-center justify-center">
                    <Image width={300} height={300} objectFit="contain" src={getServerImageUrl(data.MissionImage.data.attributes.url)} />
                </div>
                <div className="col-span-3 relative flex items-center justify-center">
                    <span className="text-gray-400/30 absolute text-8xl top-4 font-extrabold">02</span>
                    <p className={styles.Content2} dangerouslySetInnerHTML={{ __html: data.MissionContent }}></p>
                </div>

                <div className="col-span-3 relative flex items-center justify-center">
                    <p className={styles.Content2} dangerouslySetInnerHTML={{ __html: data.TechnologyContent }}></p>
                </div>
                <div className="col-span-3 relative flex items-center justify-center">
                    <Image width={300} height={300} objectFit="contain" src={getServerImageUrl(data.TechnologyImage.data.attributes.url)} />
                </div>

                <div className="col-span-3 relative flex items-center justify-center">
                    <Image width={300} height={300} objectFit="contain" src={getServerImageUrl(data.SupportImage.data.attributes.url)} />
                </div>
                <div className="col-span-3 relative flex items-center justify-center">
                    <p className={styles.Content2} dangerouslySetInnerHTML={{ __html: data.SupportContent }}></p>
                </div>
            </div>
        </div>

        <div className="w-full relative bg-brand overflow-hidden">
            <div className="contentContainer relative py-4">
                <div className="sectionCount my-6 mx-auto">
                    <span className="sectionNumber text-white/30">03</span>
                    <h2 className="text-white">{data.SectionThreeTitle}</h2>
                </div>
                <div className="w-full flex justify-around p-5 rounded shadow-xl bg-white text-gray-800 mb-12">
                    {data.keyMembers.map((member, index) => <div className="text-center p-3" key={`member${index}`}>
                        <span className="text-2xl">{member.MemberName}</span>
                        <br></br>
                        <span className="text-sm">{member.MemberDesignation}</span>
                    </div>
                    )}
                </div>
            </div>
            <div className="BrandBg _Left">
                <Image src={bgImage1} layout="responsive" objectFit="contain" />
            </div>
        </div>
    </div>;
}

export async function getStaticProps(context) {
    const { data } = await axios.get(`${API_URL}/about?${ARG_POPULATE_DEEP}`)
    return {
        props: {
            data: data && data.data && data.data.attributes ? data.data.attributes : null
        }
    }
}