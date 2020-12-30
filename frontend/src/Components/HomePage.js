import React,{ useCallback,useState } from 'react';
import { Form, FormGroup, Label, Input, Button, UncontrolledAlert } from 'reactstrap';
import {useDropzone} from 'react-dropzone';
import api from '../Utils/api';
import { connect } from "react-redux";

const csv=require('csvtojson')

const HomePage =  ({isAuthenticated})  => {

    // if(!isAuthenticated){
    //     history.push('/login')
    // }
    const [jsonData,setjsonData] = useState();
    const [dataSet,setDataSet] = useState(false);
    const addDistrict = async (name,state,seroIndex,jsonData) => {

        try{
            const res = api.post('/district',{name,state,seroIndex,jsonData})

            console.log(res.data)
            setDataSet(true)
            setTimeout(()=> setDataSet(false),5000)
            
        }catch(err){
            console.log(err)
            console.log(err.response.data)
        }
    }
    const formData = e => {
        e.preventDefault();

        console.log(e.target.name.value)
        console.log(e.target.state.value)
        console.log(e.target.seroIndex.value)

        addDistrict(e.target.name.value,e.target.state.value,e.target.seroIndex.value,jsonData)
        
    }
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
        const reader = new FileReader()
        reader.readAsText(file)

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
            csv()
                .fromString(reader.result)
                .then((jsonObj)=>{
                    setjsonData(jsonObj)
                })
        }
        })
        
    }, [])
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});
  
    const files = acceptedFiles.map(file => (
            <li key={file.path}>
                {file.path} - {file.size} bytes
            </li>
        )
    );
    return(
        <div className="m-2">
            {
                dataSet &&
                <UncontrolledAlert>
                    Data Registered! Head Over to Dashboard or villages to view the data
                </UncontrolledAlert>
            }
          <Form onSubmit={formData}>
            <div className="mb-3">
                <h3 className="section-title text-center">
                    Enter Village Data
                </h3>
            </div>
            <FormGroup>
                <Label for="name">Village Name</Label>
                <Input
                type="text"
                name="name"
                placeholder="Enter the village name"
                />
            </FormGroup>
            <FormGroup>
                <Label for="state">District Name</Label>
                <Input
                type="text"
                name="state"
                placeholder="Enter district name"
                />
            </FormGroup>
            <FormGroup>
                <Label for="seroIndex">illiteracy Factor</Label>
                <Input
                type="text"
                name="seroIndex"
                placeholder="Enter illteracy factor of your district"
                />
            </FormGroup>
            <div {...getRootProps({className: 'dropzone'})} style={{height:"100px",width:"500px",border:"1px black solid"}}>
          
        <input {...getInputProps()} />
        <p>Drag 'n' drop the village data file here in csv format</p>
      </div>
      <aside>
        <ul>{files}</ul>
        </aside>
            {/* <FormGroup>
                
                <Label for="exampleFile">District Census Data</Label>
                <Input type="file" name="file" id="exampleFile" />
                <FormText color="muted">
                    The csv formatted data collected during the census
                </FormText>
            </FormGroup> */}
            <Button color="success" type="submit">Submit</Button>
            
          </Form>
        </div>
    
    )

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
  });
  
  export default connect(mapStateToProps)(HomePage);
  