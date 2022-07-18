
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ContactForm() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const response = await axios.post('/api/sendmail', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
                <input type="text" autoComplete="off" placeholder="Fullname" {...register("fullname", { required: true })} />
            </div>
            <div className="col-span-6">
                <select autoComplete="off" placeholder="Product" {...register("product", { required: true })} >
                    <option default value="1">Product</option>
                </select>
            </div>
            <div className="col-span-6">
                <input type="email" autoComplete="off" placeholder="Email" {...register("email", { required: true })} />
            </div>
            <div className="col-span-6">
                <input type="text" autoComplete="off" placeholder="Phone" {...register("phone", { required: true })} />
            </div>
            <div className="col-span-12">
                <textarea rows={4} autoComplete="off" placeholder="Message" {...register("message", { required: true })} ></textarea>
            </div>
        </div>
        <div className="buttons py-6">
            <button className="buttonThree relative ml-auto w-max block" type="submit">Send Message <span className="mdi mdi-chevron-double-right"></span></button>
        </div>
    </form>;
}