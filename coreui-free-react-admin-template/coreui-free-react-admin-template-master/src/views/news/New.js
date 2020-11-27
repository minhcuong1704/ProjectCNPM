import React ,{ useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CLabel,
  CCardFooter,
  CSelect,
  CButton

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import moment from 'moment'
import NewService from "../../api/service/NewService.js"
import CategoryService from "../../api/service/CategoryService.js"
import { useFormik} from "formik";
  const New =  (props)  =>  {

  const [data, setData]=useState([])
  const [category, setCategory]=useState([])
   let {title,content,shortDescription,thumbnail,status,likes,categoryCode}=data
  const id =props.match.params.id


  const formik = useFormik({
    initialValues:{title,content,shortDescription,thumbnail,status,likes,categoryCode},
    enableReinitialize: true,
    onSubmit: values => {onSubmit(values)},
    //  onSubmit: values => {
    //    alert(JSON.stringify(values, null, 2));

    //  },
  });


useEffect(() => {
  function getNewData(){
    if(id !== '-1'){
    NewService.retrieveNew(id).then((response) => {
      setData(response.data);
    })
  }

  }
  function getCategoryData(){
    
    CategoryService.retrieveAllCategories().then((response) => {
     setCategory(response.data);
    })
    .catch((err)=>{
      alert(err.message);
    });
  }
  getNewData();
  getCategoryData();

  }, [id])

  function onSubmit(values){
    let todo={
      id:id,
      title:values.title,
      content:values.content,
      shortDescription:values.shortDescription,
      thumbnail:values.thumbnail,
      likes:values.likes,
      status:values.status,
      categoryCode:values.categoryCode

    }
    if(id === '-1'){
      NewService.createNew(todo)
     .then(() => props.history.push("/admin/news"))
    }else{
      NewService.updateNew(id,todo)
    .then(() => props.history.push('/admin/news'))
    }
  }

  return (
    <>
  { id !== '-1' ?(
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            New id: {id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    data&&
                     (
                       <>
                        <tr key={data.id}>
                        <td>Title</td>
                        <td><strong>{data.title}</strong></td>
                        </tr>
                        <tr >
                        <td>shortDescription</td>
                        <td><strong>{data.shortDescription}</strong></td>
                        </tr>
                        <tr>
                        <td>Content</td>
                        <td><strong>{data.content}</strong></td>
                        </tr>
                        <tr>
                        <td>Likes</td>
                        <td><strong>{data.likes}</strong></td>
                        </tr>
                        <tr>
                        <td>Status</td>
                        <td><strong>{data.status}</strong></td>
                        </tr>
                        <tr >
                        <td>Created By</td>
                        <td><strong>{data.createdBy}</strong></td>
                        </tr>

                        <tr >
                        <td>Created Date</td>
                        <td><strong>{moment(data.createdDate).format("YYYY-MM-DD")}</strong></td>
                        </tr>
                        <tr>
                        <td>Modified Date</td>
                        <td><strong>{moment(data.modifiedDate).format("YYYY-MM-DD")}</strong></td>
                        </tr>

                        </>
                      )

                  }
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  ):""}
    <CRow>
        <CCol xs="12" md="12" >
          <CCard>
          <CForm action="" method="post" onSubmit={formik.handleSubmit} className="form-horizontal">
            <CCardHeader>
              Form New
              <small> id:{id}</small>
            </CCardHeader>
            <CCardBody>
              <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="title">Title</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="title" name="title" placeholder="title" onChange={formik.handleChange}
             value={formik.values.title|| ""} />
                    <CFormText></CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="shortDescription">Short Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="shortDescription" name="shortDescription" placeholder="shortDescription" onChange={formik.handleChange}
             value={formik.values.shortDescription|| ""} />
                    <CFormText></CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="thumbnail">Thumbnail</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="thumbnail" name="thumbnail" placeholder="thumbnail" onChange={formik.handleChange}
             value={formik.values.thumbnail|| ""} />
                    <CFormText></CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="content">Content</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      name="content"
                      id="content"
                      onChange={formik.handleChange} value={formik.values.content|| ""}
                      rows="9"
                      placeholder="Content..."
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="likes">Like</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="likes" type="number" name="likes" placeholder="likes" onChange={formik.handleChange}
             value={formik.values.likes|| ""} />
                    <CFormText></CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Status</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect  custom name="status" id="status" onChange={formik.handleChange}  value={`${formik.values.status}`||"1"}>
                      <option  value="1">Active</option>
                      <option  value="2">Pending</option>
                      <option  value="3">Banned</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Category</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect  custom name="categoryCode" id="categoryCode" onChange={formik.handleChange}  value={`${formik.values.categoryCode}`||"1"}>
                      {
                        category.map((item)=>
                          (<option key={item.id}  value={item.code}>{item.name}</option>)
                        )
                      }


                    </CSelect>
                  </CCol>
                </CFormGroup>



            </CCardBody>
            <CCardFooter>
              <CButton className="" type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
            </CForm>
          </CCard>

        </CCol>

      </CRow>
</>

  )
}

export default New
