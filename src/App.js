import React, { useState, useEffect } from "react";
import TopBar from "./Components/TopBar";
import DragDropContainer from "./Components/DragDropContainer";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [containers, setContainers] = useState([
    { id: 1, title: "To-do Work", cards: [] },
    { id: 2, title: "Ongoing", cards: [] },
    { id: 3, title: "Completed", cards: [] },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editedContainerId, setEditedContainerId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleAddContainer = (title) => {
    setContainers((prevContainers) => [
      ...prevContainers,
      { title, id: prevContainers.length + 1, cards: [] },
    ]);
    setShowModal(false);
  };

  const handleAddCardToContainer = (containerId, cardTitle) => {
    setContainers((prevContainers) =>
      prevContainers.map((container) =>
        container.id === containerId
          ? {
              ...container,
              cards: [
                ...container.cards,
                { title: cardTitle, id: Date.now() }, // Use Date.now() to ensure unique ID
              ],
            }
          : container
      )
    );
  };

  const handleDrop = (e, targetContainerId) => {
    e.preventDefault(); // Prevent default behavior for drop

    const cardId = e.dataTransfer.getData("cardId"); // Get the card ID
    const cardTitle = e.dataTransfer.getData("cardTitle"); // Get the card Title

    let sourceContainer = null;
    let targetContainer = null;
    let cardMoved = false; // Variable to track if the card has been moved to a different container

    setContainers((prevContainers) => {
      const updatedContainers = prevContainers.map((container) => {
        if (container.cards.some((card) => card.id == cardId)) {
          sourceContainer = container;

          if (container.id === targetContainerId) {
            // Card is dropped in the same container, no removal needed
            cardMoved = false;
            return container;
          } else {
            // Remove the card from the source container (only if it's moved to a different container)
            cardMoved = true;
            return {
              ...container,
              cards: container.cards.filter((card) => card.id != cardId),
            };
          }
        }

        if (container.id === targetContainerId) {
          targetContainer = container;
          // Insert the dragged card at the bottom (you can change this logic if you want to place it above a specific card)
          return {
            ...container,
            cards: [...container.cards, { id: cardId, title: cardTitle }], // Add the card to target container
          };
        }

        return container;
      });

      return updatedContainers;
    });

    // Only remove the card from the source container if it was moved to a different container
    if (cardMoved) {
      // Update source container and target container after modification
      setContainers((prevContainers) => {
        return prevContainers.map((container) =>
          container.id === targetContainerId
            ? {
                ...container,
                cards: [...container.cards, { id: cardId, title: cardTitle }],
              }
            : container
        );
      });
    }
  };

  const handleEditContainer = (containerId) => {
    const container = containers.find((c) => c.id === containerId);
    if (container) {
      setEditedContainerId(containerId);
      setEditedTitle(container.title);
      setShowEditModal(true);
    }
  };

  const handleEditCard = (containerId, cardId, newTitle) => {
    setContainers((prevContainers) =>
      prevContainers.map((container) =>
        container.id === containerId
          ? {
              ...container,
              cards: container.cards.map((card) =>
                card.id === cardId ? { ...card, title: newTitle } : card
              ),
            }
          : container
      )
    );
  };

  const handleSaveEditContainer = () => {
    setContainers((prevContainers) =>
      prevContainers.map((container) =>
        container.id === editedContainerId
          ? { ...container, title: editedTitle }
          : container
      )
    );
    setShowEditModal(false);
  };

  const handleDeleteContainer = (containerId) => {
    setContainers((prevContainers) =>
      prevContainers.filter((container) => container.id !== containerId)
    );
  };

  const handleDeleteCard = (containerId, cardId) => {
    setContainers((prevContainers) =>
      prevContainers.map((container) =>
        container.id === containerId
          ? {
              ...container,
              cards: container.cards.filter((card) => card.id !== cardId),
            }
          : container
      )
    );
  };

  // Close modal if clicked outside of modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showModal && e.target.className === "modal-background") {
        setShowModal(false);
      }
      if (showEditModal && e.target.className === "modal-background") {
        setShowEditModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showModal, showEditModal]);

  return (
    <div className="wrapper" id="wrapper">
      <TopBar onAddContainer={handleShowModal} />
      <div className="containers" id="containers">
        {containers.map((container) => (
          <DragDropContainer
            key={container.id}
            containerTitle={container.title}
            containerId={container.id}
            cards={container.cards}
            handleDrop={handleDrop}
            handleAddCardToContainer={handleAddCardToContainer}
            handleEditContainer={handleEditContainer}
            handleDeleteContainer={handleDeleteContainer}
            handleDeleteCard={handleDeleteCard}
            handleEditCard={handleEditCard}
          />
        ))}
      </div>
      {showModal && (
        <div className="modal-background">
          <div className="modal">
            <h3>Add Container</h3>
            <input type="text" placeholder="Container Title" id="containerTitle" />
            <button
              className="add-button"
              onClick={() => {
                const title = document.getElementById("containerTitle").value;
                handleAddContainer(title);
              }}
            >
              Add container
            </button>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="modal-background">
          <div className="modal">
            <h3>Edit Container</h3>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Enter new container title"
            />
            <button className="save-button" onClick={handleSaveEditContainer}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App