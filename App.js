import react, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import LottieView from "lottie-react-native";
import lottieList from "./lottie/lottieList";

const { width, height } = Dimensions.get("screen");

const lottieFetch = (link) => {
  const lottieLink = fetch(link)
    .then((response) => response.json())
    .catch((err) => console.log(err));

  return lottieLink;
};

export default function App() {
  const [animation, setAnimation] = useState(require("./lottie/noel.json"));
  const [current, setCurrent] = useState(true);
  const [customLink, setCustomLink] = useState(null);
  const lottieRef = useRef(null);

  // useEffect(() => {
  //   lottieRef.current.play();
  // }, []);
  return (
    <View style={styles.container}>
      <LottieView
        ref={lottieRef}
        autoPlay
        style={{
          width: 400,
          height: 400,
          backgroundColor: "#eee",
        }}
        source={animation}
      />
      <View style={{ width, alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            if (current) {
              setCurrent(!current);
              lottieRef.current.pause();
            } else {
              setCurrent(!current);
              lottieRef.current.play();
            }
          }}
        >
          <Text>{current ? "Pause" : "Play"}</Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TextInput
            placeholder="Custom Link"
            style={{
              paddingHorizontal: 10,
              borderWidth: 0.5,
              borderRadius: 10,
              width: width - 10,
              height: 25,
            }}
            onChangeText={(e) => setCustomLink(e)}
          />
          <TouchableOpacity
            disabled={customLink ? false : true}
            onPress={() =>
              lottieFetch(customLink).then((val) => setAnimation(val))
            }
          >
            <Text>Animasyon ekle</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={lottieList}
          horizontal
          style={{ width }}
          pagingEnabled
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                backgroundColor: item.selected ? "gray" : "#eee",
                margin: 10,
                borderRadius: 5,
                borderWidth: 0.5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setAnimation(item.source);
                  setCurrent(true);
                  for (let i = 0; i < lottieList.length; i++) {
                    lottieList[i].selected = false;
                  }
                  item.selected = true;
                }}
              >
                <Text
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    color: item.selected ? "#eee" : "#000",
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
});
