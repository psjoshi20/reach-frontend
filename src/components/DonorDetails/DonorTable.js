import React, { useState } from 'react'
import Pagination from '../../Pagination'
import dateStringOf from '../../DateStringGenerator'

function DonorTable(props) {
  const totalDonations = props.donorDetails.donations.length
  const entriesPerPage = 15
  const [currentPage, setCurrentPage] = useState(1)
  const paginate = pageNumber => setCurrentPage(pageNumber)
  const begin = (currentPage - 1) * entriesPerPage
  const end = begin + entriesPerPage
  const paginateDonations = props.donorDetails.donations.slice(begin,end)
  return (
    <div className="details-table">
      <h4 className="table-title">Donations</h4>
      <p className="listing">{paginateDonations.length} out of {totalDonations} donations listed</p>

      <table className="table">
        <thead>
          <tr className="d-flex">
            <th scope="col" className="col-2">
              Date
            </th>
            <th scope="col" className="col-2">
              Amount
            </th>
            <th scope="col" className="col-2">
              Source
            </th>
            <th scope="col" className="col-2">
              Mode
            </th>
            <th scope="col" className="col-2">
              Tax
            </th>
            <th scope="col" className="col-2">
              Remarks
            </th>
          </tr>
        </thead>
        <tbody>
          <DonationList data={paginateDonations} />
        </tbody>
      </table>
      <Pagination
      totalEntries={totalDonations}
      entriesPerPage={entriesPerPage}
      paginate={paginate}
      currentPage={currentPage}
      />
    </div>
  )
}

function DonationList(props) {
  const listElements = props.data
  const listComponents = listElements.map(item => {
    return (
      <tr className="d-flex">
        <td className="col-2">{dateStringOf(new Date(item.date))}</td>
        <td className="col-2">$ {item.amount}</td>
        <td className="col-2">Charity Dinner</td>
        <td className="col-2">{item.mode}</td>
        <td className="col-2">{handleTaxStatus(item.tax)}</td>
        <td className="col-2">{item.remarks}</td>
      </tr>
    )
  })
  return <React.Fragment>{listComponents}</React.Fragment>
}

const handleTaxStatus = (tax) => {
 if (tax) {
     return "Tax Deductible"
 } else {
     return "Non-Tax Deductible"
 }
}
export default DonorTable