import React from "react";
import {CssBaseline} from "@mui/material";
import Catalog from "@/components/Catalog/Catalog";
import Header from "@/components/Header/Header";
import {GetServerSideProps} from "next";
import {Card, Rarity, Type} from '@/interfaces'

interface CatalogInterface {
    cards: Card[],
    types: Type[],
    rarities: Rarity[]
}

const Index: React.FC<CatalogInterface> = ({cards, types, rarities}) => {
  return (
      <React.Fragment>
        <CssBaseline/>
        <Header rarities={rarities} types={types}/>
        <Catalog cards={cards}/>
      </React.Fragment>
  );
}

export default Index

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    try {

        const rarity = ctx.query.rarity ? ctx.query.rarity as string : ''
        const type = ctx.query.type ? ctx.query.type as string: ''

        const params = new URLSearchParams({
            rarity,
            type
        })

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/cards?${params}`, {

        })
        const data = await response.json()

        return {
            props: {
                cards: data.data.cards,
                types: data.data.types,
                rarities: data.data.rarities
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
