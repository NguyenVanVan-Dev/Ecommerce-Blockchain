import React from 'react';
import { Link } from 'react-router-dom';

function Pagination(props) {
    const { pagination, onPageChange } = props;
    const {page, limit, totalRows} = pagination;
    const totalPages = Math.ceil(totalRows / limit);
    const handelPageChange = (newPage) => {
        if(onPageChange){
            onPageChange(newPage)
        }
    }
    const qtyPage=[];
    for (let i = 1; i <= totalPages; i++) {
        qtyPage.push(i)     
    }
    return (
        <div className="product__pagination">
            <button 
                disabled={page <= 1}
                onClick={() => handelPageChange(parseInt(page) - 1)}
            >
                <i className="fa fa-long-arrow-left" />
            </button>
            {
               qtyPage.map((item) => {
                return (<button 
                    key={item}
                    className={item == page ? "active" : ""}
                    onClick={() => handelPageChange(parseInt(item))}
                    >
                        {item}
                    </button>) 
               })
            }
            <button 
                disabled={page >= totalPages}
                onClick={() => handelPageChange(parseInt(page) + 1)}
            >
                <i className="fa fa-long-arrow-right" />
            </button>
        </div>
    )
}

export default Pagination