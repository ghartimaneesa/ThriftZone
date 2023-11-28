import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'

export default function Home() {
  // const [search, setSearch]= useState('');
  const [productCat, setProductCat] = useState([]);
  const [product, setProduct] = useState([]);
  // const [ProdList,setProdList] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/product", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'

      }
    });

    response = await response.json();
    setProduct(response[1]);
    setProductCat(response[0]);

    // console.log(response[0], response[1])
  }

  useEffect(() => {
    loadData()
  })


  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div className="carousel-inner" id='carousel'>
          {/* zIndex defines which elements overlap which  */}
          <div className='carousel-caption' style={{ zIndex: "10" }}>

            <div className="d-flex justify-content-corner">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success text-white bg-primary" type="submit">Search</button>
            </div>
          </div>
          <div className="carousel-item active" >
            <img src="https://source.unsplash.com/random/900/?Converse" className=" w-100" style={{ filter: "brightness(30%)" }} alt="... " />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?Gucci Bag" className="w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?converse" className="w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className='container'>
        {
          productCat !== []
            ? product.map((data) => {
              return (<div className='row md-5'>
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
                {productCat !== []
                  ?
                  productCat.filter((cat) => cat.CategoryName === data.CategoryName)
                    .map(filterCat => {
                      return (
                        <div key={filterCat._id} className="col-12 col-md-6 col-lg-3">
                          <Card productCat={filterCat}
                            options={filterCat.name}
                          // imgSrc={filterCat.img}
                          >


                          </Card>
                        </div>

                      )
                    }
                    ) : <div> No such data Found</div>
                }
              </div>
              )

            })
            : <div>"""""""""""</div>
        }

      </div>


      <div><Footer></Footer></div>
    </div>
  )

}
