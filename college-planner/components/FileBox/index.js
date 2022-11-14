import styled from 'styled-components'

export const BoxUpload = styled.div`
    display: grid;
    margin-top: 20px;
    place-items: center;
    border: 2px dashed;
    border-color: ${props => props.error || "#999999"};
    position: relative;
    height: 300px;
    width: 300px;
    textAlign: center;
    background: ${props => props.error || "#999999"}18;
    border-radius: 20px;
    .image-upload {
        display: flex;
        flex-wrap:wrap;
        label {
            cursor: pointer;
        
            :hover {
                opacity: .8;
            }
        }
        >input {
            display: none;
        }
    }
`

export const ImagePreview = styled.div`
    position: relative;
    #uploaded-image{
        height: 250px;
        width: 250px;
        object-fit: cover;
        border-radius: 20px;
    }
    .close-icon{
        background: #000;
        border-radius: 5px;
        opacity: .8;
        position: absolute;
        z-index: 10;
        right: 15px;
        top: 20px;
        cursor: pointer;
        :hover {
            opacity: 1;
        }   
    }
`