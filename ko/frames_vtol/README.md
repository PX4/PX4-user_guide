# VTOL 기체

PX4는 VTOL 설정에 관련된 기능을 대부분 제공합니다. 제공되는 기능과 설정들은 [기체정의서 > VTOL](../airframes/airframe_reference.md#vtol)를 참고하십시오.

- 테일시터 (X 및 플러스 구성의 듀오 및 쿼드로터)
- 틸트로터 (Firefly Y6)
- QuadPlane VTOL (표준 평면 + 쿼드)

The VTOL codebase is the same codebase as for all other airframes and just adds additional control logic, in particular for transitions.

This section contains build logs and instructions for assembling and configuring a number of VTOL vehicle frames.

## Videos

### Tailsitter

[TBS Caipiroshka](../frames_vtol/vtol_tailsitter_caipiroshka_pixracer.md)

@[youtube](https://www.youtube.com/watch?v=acG0aTuf3f8&vq=hd720)

### Tiltrotor

[Convergence Tiltrotor](../frames_vtol/vtol_tiltrotor_eflite_convergence_pixfalcon.md)

@[youtube](https://youtu.be/E61P2f2WPNU)

### QuadPlane VTOL

[FunCub QuadPlane](../frames_vtol/vtol_quadplane_fun_cub_vtol_pixhawk.md)

@[youtube](https://www.youtube.com/watch?v=4K8yaa6A0ks&vq=hd720)

[Falcon Vertigo QuadPlane](../frames_vtol/vtol_quadplane_falcon_vertigo_hybrid_rtf_dropix.md)

@[youtube](https://youtu.be/h7OHTigtU0s)

[Ranger QuadPlane](../frames_vtol/vtol_quadplane_volantex_ranger_ex_pixhawk.md)

@[youtube](https://www.youtube.com/watch?v=7tGXkW6d3sA&vq=hd720)