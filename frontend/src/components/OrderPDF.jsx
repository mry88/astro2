import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const OrderPDF = ({ orderData }) => {
  return (
    <Document>
      <Page size="A4">
        <View style={styles.container}>
          <Text style={styles.title}>Order Details</Text>
          {/* Add order details here */}
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default OrderPDF;