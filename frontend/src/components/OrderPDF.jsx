import React from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useSelector } from "react-redux";

const OrderPDF = ({ orderData, orderQuantity, orderTotal }) => {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  return (
    <PDFViewer style={styles.pdfViewer}>
      <Document>
        <Page size="A4">
          <View style={styles.container}>
            <Text style={styles.title}>Order Details</Text>

            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div>
                  <View style={styles.section}>
                    <Text style={styles.subtitle}>Customer Information:</Text>
                    <Text>Name: {auth.name}</Text>
                    <Text>Email: {auth.email}</Text>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.subtitle}>Order Items:</Text>
                    <View key={cartItem._id} style={styles.item}>
                      <Text>Product: {cartItem.name}</Text>
                      <Text>Price: Rp.{cartItem.totalPrice}</Text>
                      <Text>Quantity: {cartItem.cartQuantity}</Text>
                    </View>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.subtitle}>Order Summary:</Text>
                    <Text>Quantity: {cart.cartTotalQuantity}</Text>
                    <Text>Total: Rp.{cart.cartTotalAmount}</Text>
                  </View>
                </div>
              ))
            }
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
  pdfViewer: {
    height: 500,
    width: 500,
    margin: "auto",
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
  },
});

export default OrderPDF;