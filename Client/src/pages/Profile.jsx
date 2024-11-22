import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBreadcrumb, MDBBreadcrumbItem } from 'mdb-react-ui-kit';
import axios from 'axios';
import Ratings from "react-ratings-declarative";

const Loader = () => <div className="text-center mt-6">Loading...</div>;

const ErrorDisplay = ({ message }) => (
  <div className="text-center mt-6 text-red-600">Error: {message}</div>
);

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]); // State for donation data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, donationResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/user/profile', {
            withCredentials: true,
          }),
          axios.get('http://localhost:3000/api/user/donate/donations', {
            withCredentials: true,
          }),
        ]);

        if (userResponse.status === 200) setUser(userResponse.data);
        if (donationResponse.status === 200) setDonations(donationResponse.data.donation);
      } catch (err) {
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <section className="bg-gray-100">
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a className='text-headingCol' href="/">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a className='text-headingCol' href="/food-listings">Food-List</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="items-center">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={user.profilePicture}
                  alt="avatar"
                  className="items-center rounded-circle w-180"
                  fluid
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="text-headingCol fw-bold">Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="text-headingCol fw-bold">Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="text-headingCol fw-bold">Type</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.role === 'individual' ? 'Individual' : "Business"}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="text-headingCol fw-bold">Status</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText
                      className={`${user.status === 'active' ? 'text-success fw-bold' : 'text-danger fw-bold'}`}
                    >
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4 text-black">
                      <span className="text-headingCol fw-bold font-italic me-1">{user.name}</span> Rating
                    </MDBCardText>
                    <Ratings
                      rating={user.rating || 0}
                      widgetRatedColors="gold"
                      widgetEmptyColors="gray"
                      widgetDimensions="30px"
                      widgetSpacings="5px"
                      changeRating={null}
                    >
                      <Ratings.Widget />
                      <Ratings.Widget />
                      <Ratings.Widget />
                      <Ratings.Widget />
                      <Ratings.Widget />
                    </Ratings>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>

            {/* Displaying Donation List */}
            <MDBRow>
              <MDBCol>
                <h4 className="mt-4 text-headingCol fw-bold">Donation History</h4>
                {donations.length > 0 ? (
                  donations.map((donation) => (
                    <MDBCard key={donation._id} className="mb-3">
                      <MDBCardBody>
                      <MDBCardText>
                              <span className="fw-bold">Status:</span>{" "}
                              <span
                                className={`fw-bold ${
                                  donation.status === "completed" ? "text-success" : "text-primary"
                                }`}>
                                {donation.status === "completed" ? "Completed" : "Requested"}
                              </span>
                            </MDBCardText>

                        <MDBCardText>
                          <span className="fw-bold">Scheduled Pickup:</span> {new Date(donation.scheduledPickup).toLocaleString()}
                        </MDBCardText>
                        <MDBCardText>
                          <span className="fw-bold">Completion Date:</span> {new Date(donation.completionDate).toLocaleString()}
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  ))
                ) : (
                  <MDBCardText className="text-muted">No donations found.</MDBCardText>
                )}
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
