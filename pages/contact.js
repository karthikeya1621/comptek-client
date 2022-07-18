import styles from "../styles/Contact.module.scss";

import ContactForm from "components/ContactForm/ContactForm";
import Image from "next/image";

// Images
import bgImage1 from '@images/bg_image_1.png';
import hydImage from '@images/hyd_image.png';

export default function Contact() {
    return <div className={styles.Contact}>
        <div className="w-full relative bg-brand flex justify-center">
            <div className="sectionCount my-6">
                <span className="sectionNumber text-white/30">01</span>
                <h2 className="text-white">Hyderabad</h2>
            </div>
            <div className="BrandBg">
                <Image src={bgImage1} layout="responsive" objectFit="contain" objectPosition="bottom center" />
            </div>
        </div>
        <div className="w-full relative" style={{ height: '200px' }}>
            <div className="absolute w-full h-full">
                <Image src={hydImage} layout="responsive" objectFit="cover" />
            </div>
            <div className="contentContainer flex relative items-center h-full">
                <div className="px-10 py-12 bg-white shadow-xl top-10 relative text-gray-800 max-w-xl z-50">
                    <b className="text-brand font-bold mb-2">Comptek Computer System PVT LTD</b><br></br>
                    Plot No: 38-41, Hardware Technology Park,<br></br>
                    Ravirya Village, Maheshwaram (mandal),<br></br>
                    Rangareddy, Telangana - 500005
                </div>
            </div>
        </div>
        <div className={styles.Section02}>
            <div className="contentContainer py-12">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <div className="sectionCount mb-3 w-max">
                            <span className="sectionNumber text-white/30">02</span>
                            <h2 className="text-white">Let&apos;s get in touch!</h2>
                        </div>
                        <small className="text-white">Write to us if you want to talk about how we can work with you or your company.</small>
                    </div>
                    <div className="col-span-6">
                        <ContactForm />
                    </div>
                </div>
            </div>
            <div className={styles.ContactBg}>
                <Image src={bgImage1} layout="fill" objectFit="cover" />
            </div>
        </div>
    </div>
}