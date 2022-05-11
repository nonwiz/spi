import React from 'react';
import { Page, Text, Image, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  image: {

  }
});

// Create Document Component
const PdfDocument = ({ props }) => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={{ 'margin': 10 }}>
            <Image src={props.logo} style={{ 'height': 60, 'width': 60 }} />
          </View>
          <Text> {props.name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={{ fontSize: "11" }}>Asia-Pacific International University, No: ____</Text>
          <Text style={{ fontSize: "11" }}>195 Moo 3, Muak Lek Saraburi 18180, Tel: 036 720 777 </Text>
          <Text style={{ fontSize: "11" }}>Requisition Form</Text>
          <Text style={{ fontSize: "11" }}>Order Date: ___/___/___ When needed: ____/____/___</Text>
          <Text style={{ fontSize: "11" }}>Requesting Personnel _________ Depart ___________</Text>
          <Text>Test {props.order_request?.order_items[0].description}</Text>
            {props.order_request?.order_items.map(item => <Text><span>{item.description}</span></Text>)}
        </View>
      </Page>
    </Document >)
};

export default PdfDocument;

