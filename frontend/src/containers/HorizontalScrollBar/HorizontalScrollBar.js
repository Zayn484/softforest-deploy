import React, { Component } from "react";
import { Rate } from "antd";
import PropTypes from "prop-types";
import ScrollMenu from "react-horizontal-scrolling-menu";

let list = null;

const MenuItem = ({
  text,
  price,
  author,
  selected,
  image,
  ratings,
  onSale,
  discountRate
}) => {
  return (
    <div className={`menu-item mr-2 ${selected ? "active" : ""}`}>
      <div className="card" style={{ width: "22rem" }}>
        <div className="" style={{ height: "12rem" }}>
          <img
            className="card-img-top img-fluid h-100"
            src={image}
            alt="thumbnail"
          />
        </div>
        <div className="card-body">
          <h4 className="card-title">{text}</h4>
          <p className="creator">{author} </p>
          <div className="row pb-2">
            <div className="col-7 ">
              <Rate
                style={{ fontSize: "1.4rem" }}
                disabled
                allowHalf
                defaultValue={+ratings}
              />
            </div>
            <div className="col-4  ">
              {onSale ? (
                <strike>
                  <b>${price}</b>
                </strike>
              ) : (
                <b>${price}</b>
              )}
              <br />
              {onSale && <span>${discountRate}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Menu = list =>
  list.map(el => {
    const { title } = el;
    const { price } = el;
    const { username } = el;
    const { slug } = el;
    const { image } = el;
    const { ratings } = el;
    const { on_sale } = el;
    const { discount_rate } = el;
    return (
      <MenuItem
        text={title}
        key={slug}
        text={title}
        price={price}
        author={username}
        image={image}
        ratings={ratings}
        onSale={on_sale}
        discountRate={discount_rate}
      />
    );
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};
Arrow.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

class HorizontalscrollBar extends Component {
  state = {
    alignCenter: true,
    clickWhenDrag: false,
    dragging: true,
    hideArrows: true,
    hideSingleArrow: true,
    itemsCount: null,
    selected: null,
    translate: null,
    transition: 0.4,
    wheel: false,
    list: null
  };

  componentDidMount() {
    this.list = this.props.list;
    this.setState({ itemsCount: this.list.length });
    this.menu = null;
    this.menuItems = Menu(
      this.list.slice(0, this.list.length),
      this.state.selected
    );
  }
  componentDidUpdate(prevProps, prevState) {
    const { alignCenter } = prevState;
    const { alignCenter: alignCenterNew } = this.state;
    if (alignCenter !== alignCenterNew) {
      this.setState({ translate: 0 }, () => this.forceUpdate());
      setTimeout(() => this.menu.handleArrowClick(), 0);
    }
  }

  onUpdate = ({ translate }) => {
    //console.log(`onUpdate: translate: ${translate}`);
    this.setState({ translate });
  };

  onSelect = key => {
    this.setState({ selected: key });
    this.props.routeProps.history.push(`/shop/${key}`);
  };

  setItemsCount = ev => {
    const { itemsCount = list.length, selected } = this.state;
    const val = +ev.target.value;
    const itemsCountNew =
      !isNaN(val) && val <= list.length && val >= 0
        ? +ev.target.value
        : list.length;
    const itemsCountChanged = itemsCount !== itemsCountNew;

    if (itemsCountChanged) {
      this.menuItems = Menu(list.slice(0, itemsCountNew), selected);
      this.setState({
        itemsCount: itemsCountNew
      });
    }
  };

  setSelected = ev => {
    const { value } = ev.target;
    this.setState({ selected: String(value) });
  };
  render() {
    const {
      alignCenter,
      clickWhenDrag,
      hideArrows,
      dragging,
      hideSingleArrow,
      selected,
      translate,
      transition,
      wheel
    } = this.state;

    const menu = this.menuItems;

    return (
      <>
        <div className="container pt-2 pb-2">
          <div className="row">
            <div className="col-md-12 text-center ">
              {/* {heading} */}
              {this.props.children}
            </div>
          </div>
        </div>

        <div className="container">
          {this.state.itemsCount < 1 ? (
            <h3 className="text-center m-5">Sorry, no projects found</h3>
          ) : (
            <ScrollMenu
              ref={el => (this.menu = el)}
              data={menu}
              arrowLeft={ArrowLeft}
              arrowRight={ArrowRight}
              hideArrows={hideArrows}
              hideSingleArrow={hideSingleArrow}
              transition={+transition}
              onUpdate={this.onUpdate}
              onSelect={this.onSelect}
              scrollToSelected={true}
              selected={selected}
              translate={translate}
              alignCenter={alignCenter}
              dragging={dragging}
              clickWhenDrag={clickWhenDrag}
              wheel={wheel}
            />
          )}
        </div>
      </>
    );
  }
}

export default HorizontalscrollBar;
