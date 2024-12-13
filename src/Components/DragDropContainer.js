import React, { useState } from "react";
import "./DragDropContainer.css";

function DragDropContainer({
  containerTitle,
  containerId,
  cards,
  handleDrop,
  handleAddCardToContainer,
  handleEditContainer,
  handleDeleteContainer,
  handleEditCard,
  handleDeleteCard
}) {
  const [showCard, setShowCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [editCardModal, setEditCardModal] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [editCardTitle, setEditCardTitle] = useState("");

  const handleShowCard = () => {
    setShowCard(true);
  };

  const handleAddCard = () => {
    if (cardTitle.trim() !== "") {
      handleAddCardToContainer(containerId, cardTitle);
      setCardTitle(""); // Clear input after adding
      setShowCard(false); // Close modal
    }
  };

  const handleDragStart = (e, cardId, cardTitle) => {
    e.dataTransfer.setData("cardId", cardId);
    e.dataTransfer.setData("cardTitle", cardTitle);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleCardClick = (card) => {
    setCurrentCard(card);
    setEditCardTitle(card.title);
    setEditCardModal(true);
  };

  const handleSaveCardEdit = () => {
    if (editCardTitle.trim() !== "" && currentCard) {
      handleEditCard(containerId, currentCard.id, editCardTitle);
      setEditCardModal(false);
      setCurrentCard(null);
      setEditCardTitle("");
    }
  };

  const handleCancelCard = () =>{
    setShowCard(false);
  }

  const handleCancelCardEdit = () => {
    setEditCardModal(false);
    setCurrentCard(null);
    setEditCardTitle("");
  };

  return (
    <div className="drag-container">
      <div
        className="drop-zone"
        id="dropZone"
        onDrop={(e) => handleDrop(e, containerId)}
        onDragOver={handleDragOver}
      >
        <div className="Title">
          <h3>{containerTitle}</h3>
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/ios-filled/50/ellipsis.png"
            alt="ellipsis"
            style={{ cursor: "pointer" }}
            onClick={toggleOptions}
          />
          {showOptions && (
            <div className="options-menu">
              <button
                className="option-button"
                onClick={() => handleEditContainer(containerId)}
              >
                Edit
              </button>
              <button
                className="option-button delete"
                onClick={() => handleDeleteContainer(containerId)}
                style={{ color: "red" }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="CardSection" id="CardSection">
          {cards.map((card) => (
            <div
              key={card.id}
              className="card"
              id={`card${card.id}`}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, card.id, card.title)}
              onClick={() => handleCardClick(card)} // Open edit card modal
            >
              <div className="CardItem">
                {card.title}
                <img
                  width="15"
                  height="15"
                  src="https://img.icons8.com/ios/20/spotted-patterns.png"
                  alt="spotted-patterns"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="AddCard">
          <button className="AddCardBtn" onClick={handleShowCard}>
            Add Card
          </button>
        </div>
      </div>

      {showCard && (
        <div className="modal-background">
          <div className="modal">
            <h3>Add Card</h3>
            <input
              type="text"
              id="cardTitle"
              placeholder="Card Title"
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
            />
            <button className="add-button" onClick={handleAddCard}>
              Add card
            </button>
            <button className="cancel-button" onClick={handleCancelCard} style={{
              marginLeft:'15px'
            }}>
                Cancel
              </button>
          </div>
        </div>
      )}

      {editCardModal && (
        <div className="modal-background">
          <div className="modal">
            <div className="modal-header" style={{display:'flex',
          justifyContent:'space-between',
          alignItems:"center"}}>
              <h3>Edit Card</h3>
              <img width="20" height="20" src="https://img.icons8.com/puffy/50/trash.png" alt="trash" title="delete" style={{ cursor: "pointer" }}
                 onClick={() => {
                  handleDeleteCard(containerId, currentCard.id); // Delete card
                  handleCancelCardEdit(); // Close the edit modal
                }}/>
            </div>
            <input
              type="text"
              id="editCardTitle"
              placeholder="Card Name"
              value={editCardTitle}
              onChange={(e) => setEditCardTitle(e.target.value)}
            />
            <div className="modal-actions" style={{
              display:"flex",
              gap:'15px',
              justifyContent:"center",
              alignItems:'center'
            }}>
              <button className="save-button" onClick={handleSaveCardEdit}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCancelCardEdit}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DragDropContainer