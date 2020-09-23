// .vuepress/english_sidebar.js


module.exports = {
   sidebar: function() {
      return [
      ['/en/','Home'],
      {
        title: 'Getting Started',
        path: '/en/getting_started/',
        sidebarDepth: 1,  
        children: [ 

        '/en/getting_started/px4_basic_concepts',
        ['/en/getting_started/frame_selection','Vehicles/Frames'],
        ['/en/getting_started/flight_controller_selection','Flight Controllers'],
['/en/getting_started/sensor_selection','Sensors'],
['/en/getting_started/rc_transmitter_receiver','Radio Systems'],
['/en/getting_started/flight_modes','Flight Modes'],


      {
        title: 'Vehicle Status Notifications',
        path: '/en/getting_started/vehicle_status',
        sidebarDepth: 1,  
        children: [ 
['/en/getting_started/led_meanings','LED Meanings'],
['/en/getting_started/tunes','Tune/Sound Meanings'],
['/en/flying/pre_flight_checks','Preflight Checks'],
        ]
      },




['/en/getting_started/flight_reporting','Flight Reporting'],

        ]
      },
      {
        title: 'Basic Assembly',
        path: '/en/assembly/',
        sidebarDepth: 1,  
        children: [ 
['/en/assembly/mount_and_orient_controller','Mounting the Flight Controller'],
['/en/assembly/vibration_isolation','Vibration Isolation'],
['/en/assembly/quick_start_cuav_v5_plus','CUAV V5+ Wiring Quickstart'],
['/en/assembly/quick_start_cuav_v5_nano','CUAV V5 nano Wiring Quickstart'],
['/en/assembly/quick_start_durandal','Durandal Wiring Quickstart'],
['/en/assembly/quick_start_holybro_pix32_v5','Pix32 v5 Wiring Quickstart'],
['/en/assembly/quick_start_pixhawk4','Pixhawk 4 Wiring Quickstart'],
['/en/assembly/quick_start_pixhawk4_mini','Pixhawk 4 Mini Wiring Quickstart'],
['/en/assembly/quick_start_cube','Cube Wiring Quickstart'],
['/en/assembly/quick_start_pixracer','Pixracer Wiring Quickstart'],
['/en/assembly/quick_start_pixhawk','Pixhawk Wiring Quickstart'],
        ]
      },
      {
        title: 'Basic Configuration',
        path: '/en/config/',
        sidebarDepth: 1,  
        children: [ 
        
['/en/config/firmware','Firmware'],
['/en/config/airframe','Airframe'],
['/en/config/flight_controller_orientation','Sensor Orientation'],
['/en/config/compass','Compass'],
['/en/config/gyroscope','Gyroscope'],
['/en/config/accelerometer','Accelerometer'],
['/en/config/airspeed','Airspeed'],
['/en/config/level_horizon_calibration','Level Horizon Calibration'],
['/en/config/radio','Radio Setup'],
['/en/config/joystick','Joystick Setup'],
['/en/config/flight_mode','Flight Modes'],
['/en/config/battery','Battery'],
['/en/config/safety','Safety'],
['/en/config/motors','Motors/Servos'],
        ]
      },
      {
        title: 'Airframe Builds',
        path: '/en/airframes/',
        sidebarDepth: 1,  
        children: [ 

['/en/airframes/airframe_reference','Airframes Reference'],
['/en/frames_multicopter/','Multicopters'],
['/en/frames_multicopter/dji_f450_cuav_5plus','DJI F450 (CUAV v5+)'],
['/en/frames_multicopter/dji_f450_cuav_5nano','DJI F450 (CUAV v5 nano)'],
['/en/frames_multicopter/holybro_qav250_pixhawk4_mini','QAV250 (Pixhawk4 Mini)'],
['/en/frames_multicopter/holybro_x500_pixhawk4','X500 (Pixhawk 4)'],
['/en/frames_multicopter/holybro_s500_v2_pixhawk4','S500 V2 (Pixhawk 4)'],
['/en/frames_multicopter/dji_flamewheel_450','DJI F450 + RTK \(Pixhawk 3 Pro\)'],
['/en/frames_multicopter/lumenier_qav250_pixhawk_mini','QAV250 \(Pixhawk Mini\)'],
['/en/frames_multicopter/lumenier_qav250_pixhawk_auav_x2','QAV250 \(Pixhawk/AUAV\_X2\)'],
['/en/frames_multicopter/spedix_s250_pixracer','Spedix 250 \(Pixracer\)'],
['/en/frames_multicopter/robocat_270_pixracer','Robocat 270 \(Pixracer\)'],
['/en/frames_multicopter/matrice100','Matrice 100 (Pixhawk 1)'],
['/en/frames_multicopter/qav_r_5_kiss_esc_racer','QAV-R 5" Racer (Pixracer)'],
['/en/frames_plane/','Planes'],
['/en/frames_plane/wing_wing_z84','Wing Wing Z84 \(Pixracer\)'],
['/en/frames_vtol/','VTOL'],
['/en/frames_vtol/vtol_quadplane_fun_cub_vtol_pixhawk','FunCub QuadPlane (Pixhawk)'],
['/en/frames_vtol/vtol_quadplane_volantex_ranger_ex_pixhawk','Ranger QuadPlane (Pixhawk)'],
['/en/frames_vtol/vtol_tiltrotor_eflite_convergence_pixfalcon','Convergence Tiltrotor (Pixfalcon)'],
['/en/frames_vtol/vtol_tailsitter_caipiroshka_pixracer','TBS Caipiroshka (Pixracer)'],
['/en/frames_vtol/vtol_quadplane_falcon_vertigo_hybrid_rtf_dropix','Falcon Vertigo QuadPlane (Dropix)'],
['/en/frames_rover/','Rovers'],
['/en/frames_rover/traxxas_stampede','Traxxas Stampede'],
        ]
      },
      {
        title: 'Flying',
        path: '/en/flying/',
        sidebarDepth: 1,  
        children: [
['/en/flying/first_flight_guidelines','First Flight Guidelines'],
['/en/flying/basic_flying','Flying 101'],
['/en/flying/fixed_wing_landing','Landing \(Fixed Wing\)'],
['/en/flying/fixed_wing_takeoff','Takeoff \(Fixed Wing\)'],
['/en/flying/missions','Missions'],
['/en/flying/geofence','GeoFence'],
['/en/flying/plan_safety_points','Safety Point Planning'],
['/en/flight_modes/','Flight Modes'],
['/en/flight_modes/position_mc','Position Mode (MC)'],
['/en/flight_modes/altitude_mc','Altitude Mode (MC)'],
['/en/flight_modes/manual_stabilized_mc','Manual/Stabilized Mode (MC)'],
['/en/flight_modes/rattitude_mc','Rattitude Mode (MC)'],
['/en/flight_modes/acro_mc','Acro Mode (MC)'],
['/en/flight_modes/orbit','Orbit Mode (MC)'],
['/en/flight_modes/position_fw','Position Mode (FW)'],
['/en/flight_modes/altitude_fw','Altitude Mode (FW)'],
['/en/flight_modes/stabilized_fw','Stabilized Mode (FW)'],
['/en/flight_modes/acro_fw','Acro Mode (FW)'],
['/en/flight_modes/manual_fw','Manual Mode (FW)'],
['/en/flight_modes/takeoff','Takeoff Mode'],
['/en/flight_modes/land','Land Mode'],
['/en/flight_modes/return','Return Mode'],
['/en/flight_modes/hold','Hold Mode'],
['/en/flight_modes/mission','Mission Mode'],
['/en/flight_modes/follow_me','Follow Me Mode'],
['/en/flight_modes/offboard','Offboard Mode'],
['/en/flying/terrain_following_holding','Terrain Following/Holding'],
        ]
      },
      {
        title: 'Flight Log Analysis',
        path: '/en/log/flight_log_analysis',
        sidebarDepth: 1,  
        children: [
['/en/log/flight_review','Log Analysis using Flight Review'],
        ]
      },
      {
        title: 'Advanced Features',
        path: '/en/advanced_features/',
        sidebarDepth: 1,  
        children: [

['/en/advanced_features/traffic_avoidance_adsb','Air Traffic Avoidance: ADSB/FLARM'],
['/en/advanced_features/traffic_avoidance_utm','Air Traffic Avoidance: UTM'],
['/en/computer_vision/','Computer Vision'],
['/en/computer_vision/obstacle_avoidance','Obstacle Avoidance'],
['/en/computer_vision/safe_landing','Safe Landing'],
['/en/computer_vision/collision_prevention','Collision Prevention'],
['/en/computer_vision/path_planning_interface','Path Planning Interface'],
['/en/computer_vision/motion_capture','Motion Capture (MoCap)'],
['/en/computer_vision/visual_inertial_odometry','Visual Inertial Odometry (VIO)'],
['/en/peripherals/camera_t265_vio','Realsense T265 Tracking Camera (VIO)'],
['/en/advanced_features/precland','Precision Landing'],
['/en/advanced_features/rtk-gps','RTK GPS'],
['/en/advanced_features/satcom_roadblock','RockBlock SatCom System'],
        ]
      },
      {
        title: 'Advanced Configuration',
        path: '/en/advanced_config/',
        sidebarDepth: 1,  
        children: [

['/en/advanced_config/parameters','Finding/Updating Parameters'],
['/en/config_mc/','Multicopter Config/Tuning'],
['/en/config_mc/pid_tuning_guide_multicopter','MC PID Tuning Guide'],
['/en/config_mc/mc_trajectory_tuning','MC Setpoint Tuning (Trajectory Generator)'],
['/en/config_mc/mc_jerk_limited_type_trajectory','MC Jerk-limited Type Trajectory'],
['/en/config_mc/mc_slew_rate_type_trajectory','MC Slew-rate Type Trajectory'],
['/en/config_mc/racer_setup','Multicopter Racer Setup'],
['/en/config_fw/','Fixed Wing  Config/Tuning'],
['/en/config_fw/pid_tuning_guide_fixedwing','Fixedwing PID Tuning Guide'],
['/en/config_fw/advanced_tuning_guide_fixedwing','Fixedwing Advanced Tuning Guide'],
['/en/config_fw/trimming_guide_fixedwing','Fixedwing Trimming Guide'],
['/en/config_vtol/','VTOL Config/Tuning'],
['/en/config_vtol/vtol_quad_configuration','QuadPlane Configuration'],
['/en/config_vtol/vtol_back_transition_tuning','Back-transition Tuning'],
['/en/config_vtol/vtol_without_airspeed_sensor','VTOL w/o Airspeed Sensor'],
['/en/config_vtol/vtol_weathervane','VTOL Weather Vane'],
['/en/advanced_config/esc_calibration','ESC Calibration'],
['/en/advanced_config/tuning_the_ecl_ekf','ECL/EKF Overview & Tuning'],
['/en/advanced_config/flight_termination','Flight Termination Configuration'],
['/en/advanced_config/bootloader_update','Bootloader Update'],
['/en/advanced_config/bootloader_update_from_betaflight','Bootloader Flashing onto Betaflight Systems'],
['/en/advanced_config/land_detector','Land Detector Configuration'],
['/en/advanced_config/sensor_thermal_calibration','Sensor Thermal Compensation'],
['/en/advanced_config/compass_power_compensation','Compass Power Compensation'],
['/en/advanced_config/advanced_flight_controller_orientation_leveling','Advanced Controller Orientation'],
['/en/advanced_config/static_pressure_buildup','Static Pressure Buildup'],
['/en/advanced_config/prearm_arm_disarm','Prearm/Arm/Disarm Configuration'],
['/en/advanced_config/parameter_reference','Full Parameter Reference'],
        ]
      },
      {
        title: 'Peripheral Hardware',
        path: '/en/peripherals/',
        sidebarDepth: 1,  
        children: [
['/en/peripherals/serial_configuration','Serial Port Configuration'],
['/en/gps_compass/','GPS/Compass'],
['/en/gps_compass/rtk_gps','RTK GPS'],
['/en/gps_compass/rtk_gps_hex_hereplus','Hex Here+'],
['/en/gps_compass/rtk_gps_drotek_xl','Drotek XL'],
['/en/gps_compass/rtk_gps_cuav_c-rtk','CUAV C-RTK'],
['/en/gps_compass/rtk_gps_trimble_mb_two','Trimble MB-Two'],
['/en/gps_compass/rtk_gps_hex_here2','Hex Here2'],
['/en/gps_compass/rtk_gps_freefly','Freefly RTK GPS'],
['/en/gps_compass/rtk_gps_fem_mini2','Femtones MINI2 Receiver'],  
['/en/telemetry/','Telemetry Radios'],
['/en/telemetry/sik_radio','SiK Radio'],
['/en/telemetry/rfd900_telemetry','RFD900 (SiK) Telemetry Radio'],
['/en/telemetry/hkpilot_sik_radio','HKPilot (SIK) Telemetry Radio'],
['/en/telemetry/holybro_sik_radio','HolyBro (SIK) Telemetry Radio'],
['/en/telemetry/telemetry_wifi','Telemetry Wifi'],
['/en/telemetry/esp8266_wifi_module','ESP8266 WiFi Module'],
['/en/telemetry/3dr_telemetry_wifi','3DR Telemetry Wifi (Discontinued)'],
['/en/peripherals/mavlink_peripherals','MAVLink Telemetry (OSD/GCS)'],
['/en/peripherals/frsky_telemetry','FrSky Telemetry'],
['/en/power_module/','Power Modules'],
['/en/power_module/cuav_hv_pm','CUAV HV pm'],
['/en/power_module/cuav_can_pmu','CUAV CAN PMU'],
['/en/power_module/holybro_pm07_pixhawk4_power_module','Holybro PM07 (Pixhawk 4 PM)'],
['/en/power_module/holybro_pm06_pixhawk4mini_power_module','Holybro PM06 (Micro Power Module)'],
['/en/power_module/pomegranate_systems_pm','Pomegranate Systems Power Module'],
['/en/sensor/rangefinders','Distance Sensors \(Rangefinders\)'],
['/en/sensor/sfxx_lidar','Lightware SFxx Lidar'],
['/en/sensor/ulanding_radar','Ainstein US-D1 Standard Radar Altimeter'],
['/en/sensor/leddar_one','LeddarOne Lidar'],
['/en/sensor/tfmini','Benewake TFmini Lidar'],
['/en/sensor/lidar_lite','Lidar-Lite'],
['/en/sensor/teraranger','TeraRanger'],
['/en/sensor/cm8jl65_ir_distance_sensor','Lanbao PSK-CM8JL65-CC5'],
['/en/sensor/tachometers','Tachometers (Revolution Counters)'],
['/en/sensor/thunderfly_tachometer','ThunderFly TFRPM01 Tachometer Sensor'],
['/en/sensor/airspeed','Airspeed Sensors'],
['/en/sensor/optical_flow','Optical Flow'],
['/en/sensor/px4flow','PX4FLOW'],
['/en/sensor/pmw3901','PMW3901'],
['/en/peripherals/esc_motors','ESCs & Motors'],
['/en/peripherals/pwm_escs_and_servo','PWM ESCs and Servos'],
['/en/peripherals/dshot','DShot ESCs'],
['/en/peripherals/uavcan_escs','UAVCAN ESCs'],
['/en/peripherals/camera','Camera'],
['/en/peripherals/parachute','Parachute'],
['/en/peripherals/companion_computer_peripherals','Companion Computer Peripherals'],
['/en/peripherals/adsb_flarm','ADSB/FLARM (Traffic Avoidance)'],
        ]
      },
      {
        title: 'Autopilot Hardware',
        path: '/en/flight_controller/',
        sidebarDepth: 1,  
        children: [

['/en/flight_controller/pixhawk_series','Pixhawk Series'],
['/en/flight_controller/silicon_errata','Silicon Errata'],
['/en/flight_controller/autopilot_pixhawk_standard','Pixhawk Standard Autopilots'],
['/en/flight_controller/pixhawk4','Holybro Pixhawk 4 (FMUv5)'],
['/en/flight_controller/pixhawk4_mini','Holybro Pixhawk 4 Mini (FMUv5)'],
['/en/flight_controller/pixhawk3_pro','Drotek Pixhawk 3 Pro (FMUv4pro)'],
['/en/flight_controller/pixracer','mRo Pixracer (FMUv4)'],
['/en/flight_controller/pixhawk-2','Hex Cube Black (FMUv3)'],
['/en/flight_controller/pixhack_v3','CUAV Pixhack v3 (FMUv3)'],
['/en/flight_controller/mro_pixhawk','mRo Pixhawk (FMUv3)'],
['/en/flight_controller/holybro_pix32','Holybro pix32 (FMUv2)'],
['/en/flight_controller/pixhawk_mini','Holybro Pixhawk Mini (FMUv2)'],
['/en/flight_controller/autopilot_manufacturer_supported','Manufacturer-Supported Autopilots'],
['/en/flight_controller/mindpx','AirMind MindPX'],
['/en/flight_controller/mindracer','AirMind MindRacer'],
['/en/flight_controller/cuav_v5_plus','CUAV V5+ (FMUv5)'],
['/en/flight_controller/cuav_v5_nano','CUAV V5 nano (FMUv5)'],
['/en/flight_controller/dropix','Drotek Dropix (FMUv2)'],
['/en/flight_controller/cubepilot_cube_orange','Cube Orange (CubePilot)'],
['/en/flight_controller/cubepilot_cube_yellow','Cube Yellow (CubePilot)'],
['/en/flight_controller/kakutef7','Holybro Kakute F7'],
['/en/flight_controller/durandal','Holybro Durandal'],
['/en/flight_controller/holybro_pix32_v5','Holybro Pix32 v5'],
['/en/flight_controller/mro_x2.1','mRobotics-X2.1 (FMUv2)'],
['/en/flight_controller/nxp_rddrone_fmuk66','NXP RDDRONE-FMUK66 FMU'],
['/en/flight_controller/omnibus_f4_sd','Omnibus F4 SD'],
['/en/flight_controller/mro_control_zero_f7','mRo Control Zero F7)'],
['/en/flight_controller/modalai_fc_v1','ModalAI Flight Core v1'],
['/en/flight_controller/autopilot_experimental','Experimental/Discontinued Autopilots'],
['/en/flight_controller/ocpoc_zynq','Aerotenna OcPoC-Zynq Mini'],
['/en/flight_controller/beaglebone_blue','BeagleBone Blue'],
['/en/complete_vehicles/crazyflie2','Bitcraze Crazyflie 2.0'],
['/en/flight_controller/cuav_v5','CUAV v5 (Discontinued)'],
['/en/flight_controller/pixfalcon','Holybro Pixfalcon (Discontinued)'],
['/en/flight_controller/auav_x2','mRo AUAV-X2 (Discontinued)'],
['/en/flight_controller/raspberry_pi_navio2','Raspberry Pi 2/3 Navio2'],
['/en/flight_controller/snapdragon_flight','Snapdragon Flight (Discontinued)'],
['/en/flight_controller/snapdragon_flight_hardware_example_setup','Hardware Setup Example'],
['/en/flight_controller/snapdragon_flight_dev_environment_installation','Developer Environment Installation'],
['/en/flight_controller/snapdragon_flight_software_installation','Snapdragon Software Installation'],
['/en/flight_controller/snapdragon_flight_configuration','Configuration'],
['/en/flight_controller/snapdragon_flight_advanced','Snapdragon Advanced'],
['/en/flight_controller/pixhawk','3DR Pixhawk 1 (Discontinued)'],
        ]
      },
      {
        title: 'Complete Vehicles',
        path: '/en/complete_vehicles/',
        sidebarDepth: 1,  
        children: [
['/en/complete_vehicles/px4_vision_kit','PX4 Vision Kit'],
['/en/complete_vehicles/mindracer_BNF_RTF','MindRacer BNF & RTF'],
['/en/complete_vehicles/mindracer210','MindRacer 210'],
['/en/complete_vehicles/nanomind110','NanoMind 110'],
['/en/complete_vehicles/betafpv_beta75x','BetaFPV Beta75X 2S Brushless Whoop'],
['/en/complete_vehicles/holybro_kopis2','Holybro Kopis 2'],
['/en/complete_vehicles/intel_aero','Intel® Aero RTF Drone (Discontinued)'],
['/en/development/development','Development'],
        ]
      },
      {
        title: 'Dronecode Shortcuts',   // required
        children: [
            ['https://dev.px4.io/master/en/','PX4 Developer Guide'],
            ['https://docs.qgroundcontrol.com/en/','QGroundControl User Guide'],
            ['https://dev.qgroundcontrol.com/en/','QGroundControl Developer Guide'],
            ['https://mavlink.io/en/','MAVLink Guide'],
            ['https://mavsdk.mavlink.io/','MAVSDK'],
            ['https://camera-manager.dronecode.org/en/','Dronecode Camera Manager']   
        ]
      },

    
        

    ]
   }
}



