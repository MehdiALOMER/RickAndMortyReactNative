import React from 'react'
import { GenericImage, GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css'
import { colors, dHeight, dWidth } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import Icon from '../shared/Icons';
import { ICharacter } from '@/types/dataTypes';


interface Props {
    character: ICharacter,
    navigation: any
}



const CharacterItem = ({ character, navigation }: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    /*  const genericProductList: IGenericProduct[] = useSelector((state: RootState) => state.productReducer.genericProductList || []); */


    /*  const goToProductDetail = (product: IGenericProduct) => {
         navigation.navigate('ProductDetailScreen', { product });
     }
 
     const addToCart = (id: number) => {
         dispatch(addToCartThunk({ id, quantity: 1, productList: genericProductList }));         // quantity değeri 1 olarak gönderildi çünkü ürünü sepete eklerken default olarak 1 adet ekleniyor.
     }
     const addAndRemoveFavorite = (id: number) => {
         dispatch(addAndRemoveFavoriteThunk({ id, productList: genericProductList }));
     } */
    return (
        <GenericView backgroundColor={colors.primaryLight} margin={dWidth * .0125} padding={dWidth * .025} borderRadius={5}>
            <GenericView padding={dWidth * .0125}>
                <GenericTouchableOpacity
                /* onPress={goToProductDetail.bind(this, product)} */
                >
                    <GenericView>
                        <GenericImage source={{ uri: character.image }} resizeMode={"cover"} width={dWidth * .3875} height={dWidth * .3875} />
                    </GenericView>
                    <GenericView marginTop={dWidth * .025} flexDirection='row' spaceBetween>
                        <GenericView justifyContent='center'>
                            {/* <GenericText color={colors.primary} fontSize={16} bold>{product.price} ₺</GenericText> */}
                        </GenericView>
                        <GenericTouchableOpacity
                            /* onPress={addAndRemoveFavorite.bind(this, product.id)} */
                            justifyContent='center'
                        >
                            <Icon name={character.isFavourite ? 'heart' : 'heart-outline'} size={25} color={colors.primary} />
                        </GenericTouchableOpacity>
                    </GenericView>
                    <GenericView marginTop={dWidth * .025} marginBottom={dWidth * .025}>
                        <GenericText color={colors.black} fontSize={16} bold numberOfLines={1}>{character.name.length > 15 ? character.name.substring(0, 15) + '...' : character.name}</GenericText>
                    </GenericView>
                </GenericTouchableOpacity>
                <GenericView>
                    <GenericTouchableOpacity
                        /* onPress={addToCart.bind(this, product.id)} */
                        backgroundColor={colors.primary} padding={dWidth * .025} center borderRadius={5}
                    >
                        <GenericText color={colors.white} fontSize={16} bold>Add to Cart</GenericText>
                    </GenericTouchableOpacity>
                </GenericView>
            </GenericView>
        </GenericView>

    )
}

export default CharacterItem;