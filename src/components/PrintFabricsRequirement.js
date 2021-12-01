import React from "react";
import { Page, Text, View, Document, Svg, G, Path } from "@react-pdf/renderer";

export function PdfDocument({ drawPacks }) {
  return (
    <Document>
      <Page style={{ paddingVertical: "20mm", paddingHorizontal: "10mm" }}>
        {/* heading */}
        <Text style={{ fontSize: "14pt", textTransform: "uppercase" }}>
          Fabric Requirements
        </Text>
        {/* fabric width scale */}
        <View style={{ paddingTop: "10mm" }}>
          <Svg viewBox="0 0 140 3">
            <G>
              <Path d={`M 0 1 L 140 1 `} stroke="#666" strokeWidth="0.2" />
              <Path d={`M 0 0 L 0 2 `} stroke="#666" strokeWidth="0.4" />
              <Path d={`M 55 0 L 55 2 `} stroke="#666" strokeWidth="0.4" />
              <Path d={`M 90 0 L 90 2 `} stroke="#666" strokeWidth="0.4" />
              <Path d={`M 110 0 L 110 2 `} stroke="#666" strokeWidth="0.4" />
              <Path d={`M 140 0 L 140 2 `} stroke="#666" strokeWidth="0.4" />
            </G>
          </Svg>
          {/* scale legend */}
          <View style={{ flexDirection: "row", paddingBottom: "10mm" }}>
            <Text style={{ flex: 55, textAlign: "right", fontSize: "9pt" }}>
              55 cm
            </Text>
            <Text style={{ flex: 35, textAlign: "right", fontSize: "9pt" }}>
              90 cm
            </Text>
            <Text style={{ flex: 20, textAlign: "right", fontSize: "9pt" }}>
              110 cm
            </Text>
            <Text style={{ flex: 30, textAlign: "right", fontSize: "9pt" }}>
              140 cm
            </Text>
          </View>
        </View>

        <>
          {drawPacks
            ? drawPacks.map((pack, index) => {
                return (
                  <View
                    key={index}
                    wrap={false}
                    style={{ paddingBottom: "10mm" }}
                  >
                    {/* color block */}
                    <View>
                      <Svg viewBox="0 0 140 5">
                        <Path
                          d={`M 0 0 L 10 0 L 10 5 L 0 5 Z`}
                          fill={`${pack[0]}`}
                        />
                      </Svg>
                    </View>
                    {/* text block*/}
                    <View style={{ paddingTop: "3mm", paddingBottom: "3mm" }}>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            fontSize: "11pt",
                            fontWeight: "bold",
                            flex: 1,
                          }}
                        >
                          Color:
                        </Text>
                        <Text style={{ fontSize: "11pt", flex: 5 }}>
                          {pack[0]}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            fontSize: "11pt",
                            fontWeight: "bold",
                            flex: 1,
                          }}
                        >
                          Fabric width:
                        </Text>
                        <Text style={{ fontSize: "11pt", flex: 5 }}>
                          {pack[3]} cm
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            fontSize: "11pt",
                            fontWeight: "bold",
                            flex: 1,
                          }}
                        >
                          Required height:
                        </Text>
                        <Text style={{ fontSize: "11pt", flex: 5 }}>
                          {pack[1]} cm
                        </Text>
                      </View>
                    </View>
                    {/* requirement drawing */}
                    <View>
                      <Svg viewBox={`0 0 140 ${pack[1]}`} width="100%">
                        <G>
                          <Path
                            d={`M 0 0 L 140 0 L 140 ${pack[1]} L 0 ${pack[1]} Z`}
                            stroke="#999"
                            strokeWidth="0.2"
                          />
                          <Path
                            d={`M 0 0 L ${pack[3]} 0 L ${pack[3]} ${pack[1]} L 0 ${pack[1]} Z`}
                            stroke="#666"
                            strokeWidth="0.2"
                            fill="#eee"
                          />
                          {pack[2].map((p, i) => {
                            return (
                              <Path
                                d={p}
                                stroke="black"
                                fill="white"
                                strokeWidth="0.2"
                                key={i}
                              />
                            );
                          })}
                        </G>
                      </Svg>
                    </View>
                  </View>
                );
              })
            : null}
        </>
      </Page>
    </Document>
  );
}
