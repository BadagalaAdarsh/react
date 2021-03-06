import React, { Component } from 'react';
import {Card, CardImg, CardTitle, Button, Modal, ModalBody, ModalHeader, Col, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger} from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);



class CommentForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false
      };
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
    }

    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }

    handleSubmit(values){
        // alert("Current State is: "+ JSON.stringify(values));
        this.toggleModal();
        alert(values.author);

        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil" /> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                            <Row className="form-group">
                                <Label md={{size: 12}} htmlFor="rating">Rating</Label>
                                <Col md={{size: 12}}>
                                    <Control.select className="form-control" model=".rating" name="rating" id="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={{size: 12}} htmlFor="name">Name</Label>
                                <Col md={{size: 12}}>
                                    <Control.text  placeholder="Your Name"
                                     className="form-control" 
                                     model=".author" name="author" id="author" 
                                     validators={{
                                         required, minLength: minLength(3), maxLength : maxLength(15)
                                     }} />
                                     <Errors 
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={12} htmlFor="comment" >Comment</Label>
                                <Col md={12}>
                                    <Control.textarea rows="8" id="comment" name="comment" model=".comment" className="form-control" />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{size: 8}}>
                                    <Button color='primary'> Submit</Button>
                                </Col>
                            </Row>
                            
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


    function RenderDish({dish}) {
            if(dish!=null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <FadeTransform in 
                    tranformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)' }}>
                        <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                            <CardTitle>{dish.name}</CardTitle>
                            <p>{dish.description}</p>
                        </Card>
                    </FadeTransform>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
      }

    function RenderComments({comments, postComment, dishId}){
        if(comments!=null){
            return(
                <div>
                <h4>Comments</h4>
                <Stagger in>
                    {comments.map((com) => (
                        <Fade in>
                            <div>
                                <p>{com.comment}</p> 
                                <p>-- {com.author}, {new Intl.DateTimeFormat('en-US', {year:'numeric',month: 'short',day: '2-digit' }).format(new Date(Date.parse(com.date))) }</p>
                            </div>
                        </Fade>
                        )
                    )}
                </Stagger>
                  <CommentForm dishId={dishId} postComment={postComment} />

                </div>
            );
        }
        else{
            return(<div></div>)
        }
    }

    const DishDetail = (props) => {

        // const dish=props.dish;
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu' >Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <div className="col-12 col-md-5">
                        <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}
                        />
                    </div>
                </div>
            </div>
        );
    }




export default DishDetail;