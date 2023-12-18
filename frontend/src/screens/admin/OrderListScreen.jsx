import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useGetOrdersQuery, useDeliverOrderMutation } from '../../slices/ordersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const OrderListScreen = () => {
  const { data: orders, refetch, isLoading, error } = useGetOrdersQuery();
  const [deliverOrder] = useDeliverOrderMutation();

  const deliverHandler = async (orderId) => {
    if (window.confirm('Are you sure you want to mark this order as delivered?')) {
      try {
        await deliverOrder(orderId);
        refetch();
      } catch (err) {
        // Handle the error, e.g., display an error message
      }
    }
  };

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {!order.isDelivered && (
                    <Button
                      variant="light"
                      className="btn-sm"
                      onClick={() => deliverHandler(order._id)}
                    >
                      Mark as Delivered
                    </Button>
                  )}
                  <LinkContainer to={`/admin/order/${order._id}`}>
                    <Button variant="info" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen ;
