import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../../components/layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newCourse, clearErrors } from '../../actions/courseActions'
import { NEW_COURSE_RESET } from '../../constants/courseConstants'

import NewLesson from './NewLesson'


const NewCourse = ({ history }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Công nghệ thông tin');
    const [images, setImages] = useState([]);
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
   
    const [imagesPreview, setImagesPreview] = useState([])

    const categories = [
        'Công nghệ thông tin',
        'Ngoại ngữ'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newCourse);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/me/courses');
            alert.success('Tạo khóa học thành công');
            dispatch({ type: NEW_COURSE_RESET })
        }

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('startDate',startDate);
        formData.append('endDate',endDate);

        for (let key in images) {
            formData.append("images", images[key]);
        }

        console.log(images)
        const data = {name,price,description,category,images}

        //console.log(images)
    
        

        dispatch(newCourse(formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])  
                    setImages(e.target.files)
                }
            }

            reader.readAsDataURL(file)
        })
    }


    return (
        <Fragment>
            <MetaData title={'Khóa học mới'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Khóa học mới</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Tên</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Giá</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Mô tả</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Danh mục</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category} >{category}</option>
                                        ))}

                                    </select>
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='startDate_field'>Ngày bắt đầu</label>
                                    <input
                                        type='date'
                                        id='startDate_field'
                                        className='form-control'
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='startDate_field'>Ngày kết thúc</label>
                                    <input
                                        type='date'
                                        id='endDate_field'
                                        className='form-control'
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>


                                <div className='form-group'>
                                    <label>Ảnh đại diện</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            //multiple
                                            accept=".png, .jpeg, .jpg"
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Chọn ảnh
                                     </label>
                                    </div>

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div>



                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    TẠO MỚI
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewCourse
