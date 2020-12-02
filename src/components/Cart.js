import React from 'react';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    handleClick(id, iterator) {
        console.log(this.state.items, id, iterator)
    }

    componentDidMount() {
        fetch('https://my.api.mockaroo.com/cart', {
            headers: {
                'X-API-Key': 'f4b9ae70'
            }
        })
        .then(res => res.json())
        .then((result) => {
            this.setState({
                items: result
            });
        });
    }

    render() {
        let page = <div className="loading">Loading</div>;
        if (this.state.items.length > 0) {
            page = (
                <div className="cart">
                    <Content items={this.state.items} onClick={(id, operator) => this.handleClick(id, operator)}/>
                    <Footer items={this.state.items} />
                </div>
            );
        }

        return page;
    }
}

class Content extends React.Component {
    render() {
        return (
            <div className="content">
                {
                    this.props.items.map((elem) => {
                        return (
                            <Item
                                key={elem.id.toString()}
                                id={elem.id}
                                name={elem.name}
                                description={elem.description}
                                price={elem.price}
                                quantity={elem.quantity}
                                onClick={(id, operator) => this.props.onClick(id, operator)}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

class Item extends React.Component {
    render() {
        return (
            <div className="item">
                <div className="detail">
                    <Preview altName={this.props.name} />
                    <div className="info">
                        <Name value={this.props.name} />
                        <Description value={this.props.description} />
                    </div>
                </div>
                <div className="control">
                    <Trash />
                    <div className="quantity-and-price">
                        <Count
                            value={this.props.quantity}
                            id={this.props.id}
                            onClick={(id, operator) => this.props.onClick(id, operator)}
                        />
                        <Price value={this.props.price} quantity={this.props.quantity} />
                    </div>
                </div>
            </div>
        );
    }
}

class Preview extends React.Component {
    render() {
        return (
            <div className="preview">
                <img src="//via.placeholder.com/150.png" alt={this.props.altName} />
            </div>
        );
    }
}

class Name extends React.Component {
    render() {
        return (
            <div className="name">{ this.props.value }</div>
        );
    }
}

class Description extends React.Component {
    render() {
        return (
            <div className="description">{ this.props.value }</div>
        );
    }
}

class Trash extends React.Component {
    render() {
        return (
            <div className="buttons">
                <button className="link trash"><i className="far fa-trash-alt"> </i></button>
            </div>
        );
    }
}

class Price extends React.Component {
    render() {
        return (
            <div className="price">
                <span className="amount">{(this.props.value * this.props.quantity).toFixed(2)}</span> <span className="currency"><i className="fas fa-euro-sign"> </i></span>
            </div>
        );
    }
}

class Count extends React.Component {
    render() {
        return (
            <div className="quantity">
                <button className="btn minus" onClick={() => this.props.onClick(this.props.id, -1)}>
                    <i className="fas fa-minus"> </i>
                </button>
                <label>
                    <span className="value">{this.props.value}</span>
                    <input type="text" defaultValue={this.props.value} />
                </label>
                <button className="btn plus" onClick={() => this.props.onClick(this.props.id, 1)}>
                    <i className="fas fa-plus"> </i>
                </button>
            </div>
        );
    }
}

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <TotalPrice items={this.props.items} />
                <BuyButton />
            </div>
        );
    }
}

class TotalPrice extends React.Component {
    amount() {
        let amount = 0;
        this.props.items.map((elem) => {
            amount += (elem.price * elem.quantity);

            return 0;
        })

        return amount.toFixed(2);
    }

    render() {
        return (
            <div className="total-price">
                <span id="amount">{this.amount()}</span> <span className="currency"><i className="fas fa-euro-sign"> </i></span>
            </div>
        );
    }
}

class BuyButton extends React.Component {
    render() {
        return (
            <div className="buttons">
                <button className="btn buy">Buy</button>
            </div>
        );
    }
}
