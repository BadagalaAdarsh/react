import React,{Component} from 'react';
import Menu from './MenuComponent'
import DishDetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes'
import Header from './HeaderComponent';
import Footer from './FooterComponent';

class Main extends Component {


  constructor(props){
    super(props);

    this.state={
      dishes: DISHES,
      selectedDish: null
    };

  }

  onDishSelect(dishId){
    const a=dishId;
    this.setState({selectedDish : dishId});
}

  render() {
      return (
    <div>
      <Header />
      <div className="container">
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        {this.state.selectedDish}
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish /* parseInt(this.state.selectedDish*/ )[0]} />
      </div>
      <Footer />
    </div>
    );
  }
}

export default Main;



