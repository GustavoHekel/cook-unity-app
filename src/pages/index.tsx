import React from "react";
import {CssBaseline} from "@mui/material";
import Catalog from "@/components/Catalog/Catalog";
import Header from "@/components/Header/Header";
import {GetServerSideProps} from "next";
import {Card} from '@/interfaces'

interface CatalogInterface {
    cards: Card[]
}

const Index: React.FC<CatalogInterface> = ({cards}) => {
  return (
      <React.Fragment>
        <CssBaseline/>
        <Header/>
        <Catalog cards={cards}/>
      </React.Fragment>
  );
}

export default Index

export const getServerSideProps: GetServerSideProps = async () => {

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/cards')
        const cards = await response.json()

        return {
            props: {
                cards: cards.data
            }
        }
    /**
     * I wouldn't use ANY in a real prod app
     */
    } catch (err: any) {
        return {
            props: {
                error: err.message
            }
        }
    }


}
