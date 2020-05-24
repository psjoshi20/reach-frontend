//  1) so you create allBadges array as to store the active badges  - done
//  2) inside the loop, you check what filter is active,
//  make the <Badge> for it, and put the badge into the allBadges array
// data = [...data, {"label" : "2", "value" : 14}]
// console.log(data) - done by sheldon
// 3) once everything done, you return the
// allBadges array, then React will know to show the contents to the screen
import React from "react";
import {format} from 'date-fns'
import Delete from "../../images/Delete.svg";                             

function ActiveFilter(props) {
  const filterElements = props.filter;
  const allBadges = [];

  function removeFilter(types) {
    props.setFilter((currentFilter) => {
      const newFilter = { ...currentFilter };
      types.forEach((type) => delete newFilter[type]);
      return newFilter;
    });
  }

  const Badge = ({ children, types }) => (
    <span className="badge">
      {children}
      <img onClick={ () => removeFilter(types)}src={Delete} className ="icon" alt ="delete" />
    </span>
  );

  const dateFilter = {
    from: null,
    to: null,
    active: false,
    get value() {
      const { from, to } = this;
      const fromDate = from && format(new Date(from), 'dd MMM yyyy') 
      const toDate = to && format(new Date(to), 'dd MMM yyyy') 
      let str;
      if (fromDate && !toDate) str = `${fromDate} and after`;
      if (!fromDate && toDate) str = `${toDate} and earlier`;
      if (fromDate && toDate) str = `${fromDate} - ${toDate}`;
      return <>Date: <strong>{str}</strong></>;
    },
  };
  const amountFilter = {
    minAmt: null,
    maxAmt: null,
    active: false,
    get value() {
      const { minAmt, maxAmt } = this;
      let str;
      if (minAmt && !maxAmt) str = `${minAmt} and above`;
      if (!minAmt && maxAmt) str = `${maxAmt} and below`;
      if (minAmt && maxAmt) str = `${minAmt} - ${maxAmt}`;
      return <>Total Amount Donated: <strong>{str}</strong></>;
    },
  };

  for (const item in filterElements) {
    let theBadge;
    if (item === "taxDeduc" && filterElements[item]) {
      let status = filterElements[item];
      let newStatus;
      if (status === "true") {
        newStatus = "Tax Deductable";
      }
      if (status === "false") {
        newStatus = "Non Tax Deductable";
      }

    theBadge = <Badge key="taxDeduc" types={["taxDeduc"]}>Tax Deductable Status: <strong>{newStatus}</strong> </Badge>;
    allBadges.push(theBadge);
    
    }

    if (item === "source" && filterElements[item].length>0) 
     {
      theBadge = <Badge key="source" types={["source"]}>Source: <strong>{filterElements[item].join (", ")}</strong></Badge>;
      allBadges.push(theBadge);
    }

    if (item === "from" || item === "to") {
      dateFilter[item] = filterElements[item];
    }

    if (item === "minAmt" || item === "maxAmt") {
      amountFilter[item] = filterElements[item];
    }
  }
  if (dateFilter.from || dateFilter.to) {
    allBadges.push(
      <Badge key="date" types={["from", "to"]}>
        {dateFilter.value}
      </Badge>
    );
  }
  if (amountFilter.minAmt || amountFilter.maxAmt) {
    allBadges.push(
      <Badge key="totalAmount" types={["minAmt", "maxAmt"]}>
        {amountFilter.value}
      </Badge>
    );
  }

  return <div className="active-filter-container">{allBadges}</div>;
}

export default ActiveFilter;

//   for date, you need to check if there is "from", or "to", or both
// source is an array,
// date is two values, from and to
// donation range is also two values: minAmt and maxAmt

//   <div className ="active-filter-container">
//       <Badge> date </Badge>{'X'};
//       <Badge> sources </Badge>;
//       <Badge> taxDeduc </Badge>;
//       <Badge> totalAmountDonated </Badge>;

//       </div>
