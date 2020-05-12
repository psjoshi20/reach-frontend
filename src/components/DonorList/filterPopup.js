import React, { useState, useEffect } from "react";
import Header from "../Header";
import Modal from "../Modal";
import Chevronright from "../../images/Chevron-right.svg";
import DatePicker from "react-datepicker";
import { Typeahead } from "react-bootstrap-typeahead";

const fetchSourceList = async () => {
  const res = await fetch(`${process.env.REACT_APP_API}/sources`);
  const data = res.json();
  return data;
};

function FilterPopUp(props) {
  const query = props.query;
  const [filter, setFilter] = useState({source:[]});
  console.log(filter);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [sources, setSources] = useState([]);
  const [selectTypeAhead, setSelectedTypeAhead] = useState([]);

  useEffect(() => {
    fetchSourceList().then((data) => setSources(data));
  }, []);

  const buildQuery = () => {
    var urlParams = []
    for (let src of filter.source){
      urlParams.push('source=' + src);
    } 

    for (var key in filter) {
      if(key === 'source'){
        continue
      }
      urlParams.push(key + "=" + filter[key]);
    }
    console.log(urlParams.join('&'));
    props.setQuery(`?${urlParams.join('&')}`);
  }

 
  return (
    <Modal show={true} onHide={props.close} dialogClassName="modal-90w">
      <div class="donorlist-modal">
        <Modal.Header>
          <div>
            <h3 className="donorfilters-head">Donor Filters</h3>
            <span className="donorfilters-subhead">
              Donor has made at least 1 donation that satisfies the following
              criteria
            </span>
          </div>

          <Modal.Close onClick={props.close} />
        </Modal.Header>
        <Modal.Body>
          <div className="modalbody">
            <div className="modalfilter">
              <b class="filterlabel">Date Range</b>
              <div className="filterdatepicker d-flex">
                <div>
                  <label className="datelabel-from" htmlFor="startDate">
                    {" "}
                    From &nbsp; {"      "}
                  </label>
                  <DatePicker
                    className="dateform"
                    selected={startDate}
                    name="from"
                    onChange={(date) => {
                      setStartDate(date);
                      setFilter({ ...filter, from: date.toISOString() });
                    }}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <div>
                  <label className="datelabel-to" htmlFor="endDate">
                    {" "}
                    To &nbsp; {"      "}
                  </label>
                  <DatePicker
                    className="dateform"
                    selected={endDate}
                    name="to"
                    onChange={(date) => {
                      setEndDate(date);
                      setFilter({ ...filter, to: date.toISOString() });
                    }}
                    selectsEnd
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>
            </div>

            <div className="modalfilter">
              <strong class="filterlabel">Tax Deductable Status</strong>

              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  class="custom-control-input"
                  id="defaultInline1"
                  name="taxDeduc"
                  onChange={() =>
                    "taxDeduc" in filter ? delete filter.taxDeduc : null
                  }
                />
                <label class="custom-control-label" htmlFor="defaultInline1">
                  Any
                </label>
              </div>

              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  class="custom-control-input"
                  id="defaultInline2"
                  name="taxDeduc"
                  onChange={(e) =>
                    setFilter({ ...filter, [e.target.name]: e.target.value })
                  }
                  value={true}
                />
                <label class="custom-control-label" htmlFor="defaultInline2">
                  Tax Deductible
                </label>
              </div>

              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  class="custom-control-input"
                  id="defaultInline3"
                  name="taxDeduc"
                  onChange={(e) =>
                    setFilter({ ...filter, [e.target.name]: e.target.value })
                  }
                  value={false}
                />
                <label class="custom-control-label" htmlFor="defaultInline3">
                  Non Tax Deductible
                </label>
              </div>
            </div>

            <div className="modalfilter">
              <b class="filterlabel">Source contains any of these phrase(s)</b>
              <span className="donorfilter-subhead">
                Type in each source and press "Enter"
              </span>
              <form
                action=""
                className="form-inline my-2 my-lg-0"
                id="sourceSearchForm"
              >
                <Typeahead
                  id="sources-list"
                  labelKey="description"
                  multiple={true}
                  options={sources}
                  name = "source[]"
                  onChange={(selected) => {
                    setSelectedTypeAhead(selected);
                    setFilter({
                      ...filter,
                      source: selected.map((e) => {
                        return e.description;
                      }) 
                    });
                  }}
                  placeholder="e.g. Charity Dinner, Reach website"
                  selected={selectTypeAhead}
                  className="sources"
                />
              </form>
            </div>

            <div className="modalfilter">
              <b class="filterlabel d-flex">Total Donated Amount</b>
              <form
                class="form-inline my-2 my-lg-0"
                id="donationAmtSearchForm "
              >
                <input
                  className="form-control mr-sm-2 form-amt"
                  name="minAmt"
                  type="number"
                  step="0.01"
                  placeholder="$.0.00"
                  aria-label="Search"
                  onChange={(e) => {
                    setFilter({ ...filter, [e.target.name]: e.target.value });
                    /* if (!filter.minAmt) delete filter.minAmt */
                  }}
                />
                to&nbsp; {"      "}
                <input
                  className="form-control mr-sm-2 form-amt"
                  name="maxAmt"
                  type="number"
                  step= "0.01"
                  placeholder="$0.00"
                  aria-label="Search"
                  onChange={(e) =>
                    setFilter({ ...filter, [e.target.name]: e.target.value })
                  }
                />
              </form>
            </div>
          </div>
        </Modal.Body>
      </div>
      <div className="advanced-filters">
        <button
          onClick={() => {}}
          className="button transparentbutton advanced-filters-toggle"
        >
          <img src={Chevronright} className="button-icon" alt="right arrow" />{" "}
          View Advanced Filters
        </button>
      </div>
      <Modal.Footer>
        <Header.Buttons>
          <div style={{ display: "flex" }}>
            <button
              style={{ marginLeft: "auto" }}
              // onClick={() => {}}
              className="button transparentbutton"
            >
              Reset Filters
            </button>
            <button
              onClick={()=>buildQuery()}
              className={"button orangebutton "}
            >
              Apply Filters
            </button>
          </div>
        </Header.Buttons>
      </Modal.Footer>
    </Modal>
  );
}
export default FilterPopUp;
