import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { FlatList, View } from 'react-native';

import { useCart } from '../../hooks/cart';
import { ProductCart } from '../../components/ProductCart';

import {
    Container,
    Header,
    BackButton,
    Info,
    Title,
    Subtitle,
    Content,
    Footer,
    Wrapper,
    Description,
    PriceCotent,
    Currency,
    Price,
    Line,
    CurrencyTotal,
    PriceTotal,
    ListDivider
} from './styles';

export function Cart({ navigation }) {
    const theme = useTheme();
    const { cart, removeToCart, updateToCart } = useCart();

    function handleRemoveProduct(id: number){
        removeToCart(id);
    }

    function handleUpdateCart(id: number, quantity: number){
        quantity == 0 ? removeToCart(id) : updateToCart(id, quantity);
    }

    const quantityCart =
        cart.reduce((sumTotal, product) => {
            sumTotal += product.quantity;
            return sumTotal
        }, 0);

    const subTotal =
        cart.reduce((sumTotal, product) => {
            sumTotal += product.quantity * product.price;
            return sumTotal
        }, 0);

    const shipping = quantityCart > 0 ? 7 : 0;

    return (
        <Container>
            <Header>
                <BackButton
                    onPress={() => navigation.goBack()}
                >
                    <Feather
                        name="arrow-left"
                        size={30}
                        color={theme.colors.primary}
                    />
                </BackButton>

                <Info>
                    <Title>
                        My Cart
                    </Title>

                    <Subtitle>
                        {quantityCart} items
                    </Subtitle>
                </Info>

                <View style={{ width: 30 }} />
            </Header>

            <Content>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={cart}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ paddingHorizontal: 30, paddingBottom: 30 }}
                    ItemSeparatorComponent={() => <ListDivider />}
                    renderItem={({ item }) =>
                        <ProductCart 
                            product={item} 
                            removeProduct={handleRemoveProduct}
                            updateProduct={handleUpdateCart}
                        />
                    }
                />
            </Content>

            <Footer>
                <Wrapper>
                    <Description>Sub total: </Description>

                    <PriceCotent>
                        <Currency>$</Currency>
                        <Price>{subTotal.toFixed(2)}</Price>
                    </PriceCotent>
                </Wrapper>

                <Wrapper>
                    <Description>Shipping: </Description>

                    <PriceCotent>
                        <Currency>$</Currency>
                        <Price>{shipping.toFixed(2)}</Price>
                    </PriceCotent>
                </Wrapper>

                <Line />

                <Wrapper>
                    <Description>Total: </Description>

                    <PriceCotent>
                        <CurrencyTotal>$</CurrencyTotal>
                        <PriceTotal>{(subTotal + shipping).toFixed(2)}</PriceTotal>
                    </PriceCotent>
                </Wrapper>
            </Footer>
        </Container>
    );
}