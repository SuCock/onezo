import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  CartCount,
  CartHeader,
  CartItem,
  CartMain,
  CartMenu,
  CartMoreBt,
  CartStyle,
  CartTotalPrice,
} from "../../styles/cart/CartStyle";
import Layout from "../../layouts/Layout";
import { useNavigate } from "react-router-dom";
import PayModal, { ModalBackground } from "../../components/pay/PayModal";
import {ShopModal} from '../../components/shop/ShopModal';

const storeData = {
  store: "대구동성로점",
  address: "대구 중구 동성로5길 89",
};
const cartData = [
  {
    id: 1,
    menu: "핫황금올리브치킨™크리스피",
    count: 1,
    price: 21000,
    pic: `/images/my/chicken1.jpg`,
    totalPrice: 53500,
  },
  {
    id: 2,
    menu: "자메이카 통다리구이",
    count: 1,
    price: 21500,
    pic: `/images/my/chicken2.jpg`,
    totalPrice: 53500,
  },
  {
    id: 3,
    menu: "모둠감자튀김",
    count: 1,
    price: 11000,
    pic: `/images/my/chicken2.jpg`,
    totalPrice: 53500,
  },
];


const CartPage = () => {
  // 데이터 연동(장바구니)



  // 경로 이동
  const navigate = useNavigate();
  const moveToMoreMenu = () => navigate(`/menu`);
  // 결제창 나오기
  const [payModal, setPayModal] = useState(false);
  const handlePayModal = () => setPayModal(true);
  const closePayModal = () => setPayModal(false);

  const [shopModal, setShopModal] = useState(false);
  const handleShopModal = () => setShopModal(true);
  const closeShopModal = () => setShopModal(false);
  
  return (
    <Layout>
      {payModal && (
        <>
          <PayModal
            add={storeData.address}
            menu={cartData[0].menu}
            count={cartData.length - 1}
            price={cartData[0].totalPrice}
            onCloseModal={closePayModal}
          />
          <ModalBackground></ModalBackground>
        </>
      )}

      {shopModal && (
        <>
          <ShopModal
            onCloseModal={closeShopModal}
          />
          <ModalBackground></ModalBackground>
        </>
      )}
      <CartStyle>
        <CartHeader>
          <p>장바구니</p>
        </CartHeader>
        <CartMain>
          <CartItem>
            <img src="images/my/store.png" />
            <div style={{ width: "970px" }}>
              <p>{storeData.store}</p>
              <h3>{storeData.address}</h3>
            </div>
            <button className="store_change" onClick={handleShopModal}>변경</button>
          </CartItem>
          {cartData.map(item => {
            const [count, setCount] = useState(item.count);
            const handleIncrement = () => {
              setCount(count + 1);
            };
            const handleDecrement = () => {
              if (count > 1) {
                setCount(count - 1);
              }
            };
            return (
              <CartItem key={item.id}>
                <img src={item.pic} />
                <div>
                  <CartMenu>
                    <span>{item.menu}</span>
                    <button>삭제</button>
                  </CartMenu>
                  <CartCount>
                    <div>
                      <button onClick={handleDecrement}>-</button>
                      <h2>{count}</h2>
                      <button onClick={handleIncrement}>+</button>
                    </div>
                    <span>
                      {new Intl.NumberFormat().format(item.price * count)}원
                    </span>
                  </CartCount>
                </div>
              </CartItem>
            );
          })}
          <CartMoreBt onClick={moveToMoreMenu}>
            <img src="images/my/bt_plus.svg" />더 담으러 갈래요
          </CartMoreBt>
          <CartTotalPrice>
            <p>총 결제금액</p>
            <div>
              <span>
                {new Intl.NumberFormat().format(cartData[0].totalPrice)}원
              </span>
              <button onClick={handlePayModal}>주문하기</button>
            </div>
          </CartTotalPrice>
        </CartMain>
      </CartStyle>
    </Layout>
  );
};
export default CartPage;