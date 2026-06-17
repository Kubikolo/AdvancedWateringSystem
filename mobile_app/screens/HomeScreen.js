import React, { useState } from 'react';
import { View, ScrollView, FlatList, Text, Pressable } from 'react-native';
import TankItem from '../components/tanks/TankItem';
import PlantCard from '../components/plants/PlantCard';
import PumpSettingsModal from '../components/plants/PumpSettingsModal';
import { TANKS, PLANTS } from '../constants/dummyData';
import { styles, SPACING, COLORS } from '../styles/global';
import PlantModal from '../components/plants/PlantModal';
import FilterBar from '../components/FilterBar';
import TankModal from '../components/tanks/TankModal';
import ConfirmationModal from '../components/otherModals/ConfirmationModal';
import GeneralSettingsModal from '../components/otherModals/GeneralSettingsModal';
import ErrorCard from '../components/ErrorCard';
import { SafeAreaView, StatusBar } from 'react-native';

const HomeScreen = () => {
  const [plants, setPlants] = useState(PLANTS);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [plantModalVisible, setPlantModalVisible] = useState(false);

  const [pumpModalVisible, setPumpModalVisible] = useState(false);
  const [selectedPumpPlant, setSelectedPumpPlant] = useState(null);

  const [filteredTanks, setFilteredTanks] = useState(TANKS.map(tank => tank.id));

  const [selectedTank, setSelectedTank] = useState(null);
  const [tankModalVisible, setTankModalVisible] = useState(false);

  const [emergencyMode, setEmergencyMode] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  const handlePlantOpenSettings = (plant) => {
    setSelectedPlant(plant);
    setPlantModalVisible(true);
  };

  const handlePlantCloseSettings = () => {
    setSelectedPlant(null);
    setPlantModalVisible(false);
  };

  const handlePlantSaveSettings = (updatedPlant) => {
    setPlants((prevPlants) =>
      prevPlants.map((p) => (p.id === updatedPlant.id ? updatedPlant : p))
    );
    handlePlantCloseSettings();
  };

  const handleOpenPumpSettings = (plant) => {
    setSelectedPumpPlant(plant);
    setPumpModalVisible(true);
  };

  const handleClosePumpSettings = () => {
    setSelectedPumpPlant(null);
    setPumpModalVisible(false);
  };

  const handlePump = (pumpSettings) => {
    console.log('Pumping water for plant:', pumpSettings);

    // TODO: Add your pump control logic here (send command to hardware etc.)
  };

  const handleTankOpenSettings = (tank) => {
    setSelectedTank(tank);
    setTankModalVisible(true);
  };

  const handleTankCloseSettings = () => {
    setSelectedTank(null);
    setTankModalVisible(false);
  };

  const handleOpenConfirmationModal = () => {
    setConfirmationModalVisible(true);
  };

  const handleCloseConfirmationModal = () => {
    setConfirmationModalVisible(false);
  };

  const handleKillswitch = () => {
    setEmergencyMode(!emergencyMode);
    setConfirmationModalVisible(false);
  };

  const handleOpenSettingsModal = () => {
    setSettingsModalVisible(true);
  };

  const handleCloseSettingsModal = () => {
    setSettingsModalVisible(false);
  };

  const handleSaveSettingsModal = () => {
    setSettingsModalVisible(false);
  };

  const filters = TANKS;

  const handleFiltersChange = (selected) => {
    console.log('Selected Filters:', selected);
    selected.length > 0 ? setFilteredTanks(selected) : setFilteredTanks(TANKS.map(tank => tank.id));
  };

  return (
    <SafeAreaView 
    style={[
      styles.container, 
      emergencyMode && styles.emergency, 
      { paddingTop: StatusBar.currentHeight }
    ]}
  >
    <View style={[styles.container, emergencyMode && styles.emergency]}>

      {/* <View style={{paddingHorizontal: SPACING.md }}>
        <ErrorCard/>
      </View> */}
      
      {/* <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{minHeight: 180, maxHeight: 180}}
      >
        {TANKS.map((tank) => (
          <TankItem key={tank.id} tank={tank} onCardPress={handleTankOpenSettings}/>
        ))}
      </ScrollView> */}
      
      <View style={{ flexDirection: 'row', paddingHorizontal: SPACING.md, paddingBottom: SPACING.md }}>
        <Pressable style={[styles.buttonPrimary, {flex: 1, marginRight: SPACING.sm}]} onPress={handleOpenSettingsModal}>
          <Text style={[styles.middleBarText, {color: COLORS.white}]}>
            Settings
          </Text>
        </Pressable>
        {/* <Pressable style={styles.buttonCancel} onPress={handleOpenConfirmationModal}>
          <Text style={styles.middleBarText}>
            KILLSWITCH
          </Text>
        </Pressable> */}
      </View>
{/* 
      <View style={{ marginTop: SPACING.md , marginBottom: SPACING.md}} >
        <FilterBar
          initialFilters={filters}
          onSelectionChange={handleFiltersChange}
        />
      </View> */}

      <FlatList
        data={plants.filter((plant) => filteredTanks.includes(plant.tank))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlantCard
            plant={item}
            onCardPress={handlePlantOpenSettings}
            onPumpPress={handleOpenPumpSettings}
            emergency={emergencyMode}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: SPACING.md,
          paddingBottom: SPACING.md,
        }}
      />

      <TankModal
        visible={tankModalVisible}
        tank={selectedTank}
        onClose={handleTankCloseSettings}
      />

      <PlantModal
        visible={plantModalVisible}
        plant={selectedPlant}
        onClose={handlePlantCloseSettings}
        onSave={handlePlantSaveSettings}
      />

      <PumpSettingsModal
        visible={pumpModalVisible}
        plant={selectedPumpPlant}
        onClose={handleClosePumpSettings}
        onPump={handlePump}
      />

      <ConfirmationModal
        visible={confirmationModalVisible}
        onNo={handleCloseConfirmationModal}
        onYes={handleKillswitch}
        emergency={emergencyMode}
      />

      <GeneralSettingsModal
        visible={settingsModalVisible}
        onClose={handleCloseSettingsModal}
        onSave={handleSaveSettingsModal}
      />
    </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
