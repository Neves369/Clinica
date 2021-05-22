import React, { useState, useEffect} from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Moment from 'moment';




// Create styles
const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      padding: 10,
      flexGrow: 1,
      textAlign: 'center', 
      margin: 30,
    },
    tamanho:{
      width: "100vw"
    },
    text:{
      fontSize: 25,
      padding: 10,

    }
  });


// Create Document Component
const MyDocument = (props) => {

  return(
    <Document style={styles.tamanho}>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title} fixed />
            
          
          <Text style={styles.text}>
              Numero do Recibo: {props.recibo.id}
            </Text> 
            <Text style={styles.text}>
              Data do atendimento: {Moment(props.recibo.data_atendimento).format('DD/MM/yyyy')}
            </Text>
            <Text style={styles.text}>
              Paciente: {props.recibo.paciente}
            </Text>
            <Text style={styles.text}>
              Medico: {props.recibo.medico}
            </Text>
            <Text style={styles.text}>
              CRM: {props.recibo.crm}
            </Text>
            <Text style={styles.text}>
              Descrição do serviço: {props.recibo.servico}
            </Text>

            <Text>
              --------------------------------------------------------------
            </Text>

            <Text style={styles.text}>
              Valor do serviço: {props.recibo.valor}
            </Text>

        </View>
       
      </Page>
    </Document>
)}
  
  
  export default MyDocument; 